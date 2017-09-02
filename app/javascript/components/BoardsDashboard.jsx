import { connect } from 'react-redux';
import BoardsDashboardDisplay from './BoardsDashboardDisplay';

function mapDashboardStateToProps(state) {
  return {
    boards: state.boards
  };
}

function mapDashboardDispatchToProps(dispatch) {
  return {

  };
}

const BoardsDashboard = connect(
  mapDashboardStateToProps,
  mapDashboardDispatchToProps
)(BoardsDashboardDisplay);

export default BoardsDashboard;
