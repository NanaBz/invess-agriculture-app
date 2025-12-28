
import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import RequestsList from './RequestsList';
import RequestForm from './RequestForm';
import RequestDetail from './RequestDetail';
import { addRequest } from '../../store/requestsSlice';

export default function RequestsScreen() {
  const requests = useSelector((state: RootState) => state.requests.requests);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleCreate = () => setShowForm(true);
  const handleSubmit = (data: any) => {
    dispatch(addRequest(data));
    setShowForm(false);
  };
  const handleCancel = () => setShowForm(false);
  const handleSelect = (req: any) => setSelected(req);
  const handleBack = () => setSelected(null);

  return (
    <View style={{ flex: 1 }}>
      {!selected && (
        <RequestsList requests={requests} onSelect={handleSelect} onCreate={handleCreate} />
      )}
      {selected && (
        <RequestDetail request={selected} onBack={handleBack} />
      )}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <RequestForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </View>
      </Modal>
    </View>
  );
}
