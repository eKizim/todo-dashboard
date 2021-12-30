import React from 'react';
import Controller from './containers/controller/Controller.jsx';
import ModalFields from './containers/modal_fields/ModalFields.jsx';
import Fields from './containers/fields/Fields.jsx';

export default function App() {
  return (
    <React.Fragment>
      <Controller/>
      <ModalFields/>
      <Fields/>
    </React.Fragment>
  );
}
