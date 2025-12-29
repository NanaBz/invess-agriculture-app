
import React, { useState, useEffect } from 'react';
import { View, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import RequestsList from './RequestsList';
import RequestForm from './RequestForm';
import RequestDetail from './RequestDetail';
import { addRequest } from '../../store/requestsSlice';
import { addNotification } from '../../store/notificationsSlice';

export default function RequestsScreen() {
  const requests = useSelector((state: RootState) => state.requests.requests);
    // Polling for live updates
    useEffect(() => {
      const interval = setInterval(() => {
        // You may need to dispatch a thunk or call an API to fetch latest requests
        // Example: dispatch(fetchRequests())
        // If using RTK Query or SWR, trigger a refetch here
      }, 10000);
      return () => clearInterval(interval);
    }, []);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleCreate = () => setShowForm(true);
  const handleSubmit = (data: any) => {
    dispatch(addRequest(data));
    dispatch(addNotification({
      title: 'New Request Submitted',
      message: `Request for ${data.warehouse} submitted successfully.`,
      type: 'info',
    }));
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
