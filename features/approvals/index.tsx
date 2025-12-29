
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import ApprovalsList from './ApprovalsList';
import ApprovalDetail from './ApprovalDetail';
import { approveRequest, rejectRequest } from '../../store/requestsSlice';
import { addNotification } from '../../store/notificationsSlice';

export default function ApprovalsScreen() {
  // Polling for live updates
  const requests = useSelector((state: RootState) => state.requests.requests.filter(r => r.status === 'Pending'));
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<any>(null);

  const handleSelect = (req: any) => setSelected(req);
  const handleBack = () => setSelected(null);
  const handleApprove = (id: string) => {
    dispatch(approveRequest(id));
    dispatch(addNotification({
      title: 'Request Approved',
      message: `Request ${id} has been approved.`,
      type: 'success',
    }));
    setSelected(null);
  };
  const handleReject = (id: string) => {
    dispatch(rejectRequest(id));
    dispatch(addNotification({
      title: 'Request Rejected',
      message: `Request ${id} has been rejected.`,
      type: 'warning',
    }));
    setSelected(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // dispatch(fetchApprovals()) or trigger a refetch here
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!selected && (
        <ApprovalsList requests={requests} onSelect={handleSelect} />
      )}
      {selected && (
        <ApprovalDetail request={selected} onBack={handleBack} onApprove={handleApprove} onReject={handleReject} />
      )}
    </View>
  );
}
