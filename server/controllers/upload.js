const xlsx = require('node-xlsx');
const _ = require('lodash');
const async = require('async');

const getModel = (models, table) => {
  const modelMap = {
    contents: models.Contents,
    contentimages: models.Contentimages,
    localsuggestions: models.Localsuggestions,
    localsuggestions_es: models.LocalsuggestionsEs,
    localphotos: models.Localphotos,
    locals_info: models.LocalsInfo,
    locals_info_es: models.LocalsInfoEs
  };

  return modelMap[table];
};

const proccessFile = (req) => {
  try {
    const workSheetsFromBuffer = xlsx.parse(req.files[0].buffer);
    return { table: req.body.table, data: workSheetsFromBuffer };
  } catch (err) {
    return false;
  }
};

exports.getSheets = (req, res) => {
  const xlsx = proccessFile(req);
  if (!xlsx) res.sendStatus(400);

  const sheets = _.map(xlsx.data, 'name');
  res.send(sheets);
};

const getData = (req) => {
  const xlsx = proccessFile(req);
  if (!xlsx) return false;
  try {
    const sheet = req.params.sheet;
    const result = _.find(xlsx.data, { name: sheet });
    return result.data;
  } catch (err) {
    return false;
  }
};

const transformToObject = (data) => {
  const keys = data[0];
  const object = _.transform(_.slice(data, 1),
    (result, value) => {
      if (value.length > 0) {
        result.push(_.zipObject(keys, value));
      }
    }, []);


  return object;
};

const getDataByAction = (data, action) => {
  data = _.filter(data, { action });
  // remove index
  data = _.transform(data,
    (result, value) => {
      if (action === 'insert') {
        result.push(_.omit(value, ['id']));
      } else {
        result.push(value);
      }
    }, []);

  return data;
};

const validate = (data, models, table) => {
  const model = getModel(models, table);
  const validation = [];

  _.forIn(data, (row) => {
    const Model = model(row);
    Model.isValid((valid) => {
      if (!valid && Model.errors) {
        validation.push({ data: row, errors: Model.errors });
      }
    });
  });

  if (validation.length > 0) {
    return { status: false, validationErrors: validation };
  }

  return { status: true, validationErrors: validation };
};

exports.proccessData = (req, res, cb) => {
  let data = getData(req);
  if (!data) cb(null, false);

  const models = req.app.models;
  const table = req.body.table;
  data = transformToObject(data);

  function isDataValid(cb) {
    cb(null, validate(data, models, table));
  }

  function insert(result, cb) {
    if (!result.validate.status) return cb();
    const model = getModel(models, table);
    const dataToInsert = getDataByAction(data, 'insert');
    if (!dataToInsert) return cb();
    model.create(dataToInsert, cb);
  }

  function update(result, cb) {
    if (!result.validate.status) return cb();
    const model = getModel(models, table);
    const dataToUpdate = getDataByAction(data, 'update');
    if (!dataToUpdate) return cb();

    async.eachSeries(dataToUpdate, (row, innerCb) => {
      model.upsert(row, {}, innerCb);
    }, (err) => {
      if (err) cb(err);
      cb(null, true);
    });
  }

  function deleteData(result, cb) {
    if (!result.validate.status) return cb();
    const model = getModel(models, table);
    const dataToDelete = getDataByAction(data, 'delete');
    if (!dataToDelete) return cb();

    async.eachSeries(dataToDelete, (row, innerCb) => {
      model.destroyById(row.id, {}, innerCb);
    }, (err) => {
      if (err) cb(err);
      cb(null, true);
    });
  }

  function handleResult(err, result) {
    if (err) return cb(err);
    console.log(result);
    if (!result.validate.status) {
      return cb(null, result.validate);
    }
    cb(null, { status: true, message: 'Data successfully proccessed' });
  }

  async.auto({
    validate: isDataValid,
    insert: ['validate', insert],
    update: ['validate', update],
    delete: ['validate', deleteData]
  }, handleResult);
};
