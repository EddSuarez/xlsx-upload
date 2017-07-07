import template from './sidebar.html';
import controller from './sidebar.controller';
import './sidebar.less';

const sidebarComponent = () => {
  return {
    template,
    controller
  };
};

export default sidebarComponent;
