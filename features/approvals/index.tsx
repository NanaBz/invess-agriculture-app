
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import ApprovalsList from './ApprovalsList';
import ApprovalDetail from './ApprovalDetail';
import { approveRequest, rejectRequest } from '../../store/requestsSlice';

export default function ApprovalsScreen() {
  const requests = useSelector((state: RootState) => state.requests.requests.filter(r => r.status === 'Pending'));
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<any>(null);

  const handleSelect = (req: any) => setSelected(req);
  const handleBack = () => setSelected(null);
  const handleApprove = (id: string) => {
    dispatch(approveRequest(id));
    setSelected(null);
  };
  const handleReject = (id: string) => {
    dispatch(rejectRequest(id));
    setSelected(null);
  };

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
