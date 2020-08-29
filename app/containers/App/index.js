import React from 'react';
import ConnectionProvider from 'containers/ConnectionProvider';
import Recycler from 'components/Recycler';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useDispatch, useSelector } from 'react-redux';
import ConnectModal from 'components/ConnectModal';
import ConfirmationModal from 'components/ConfirmationModal';
import TopBar from 'components/TopBar';
import saga from 'containers/App/saga';
import reducer from 'containers/App/reducer';
import * as s from 'containers/App/selectors';
import * as a from 'containers/App/actions';

import GlobalStyle from '../../global-styles';

export default function App() {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'saga', saga });
  const dispatch = useDispatch();
  const closeConnectorModal = () => dispatch(a.showConnectorModal(false));
  const showConnectorModal = useSelector(s.selectShowConnectorModal());
  const closeConfirmationModal = () => dispatch(a.showConfirmationModal(false));
  const showConfirmationModal = useSelector(s.selectShowConfirmationModal());

  return (
    <ConnectionProvider>
      <GlobalStyle />
      <TopBar />
      <Recycler />
      <ConnectModal show={showConnectorModal} onHide={closeConnectorModal} />
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={closeConfirmationModal}
      />
    </ConnectionProvider>
  );
}
