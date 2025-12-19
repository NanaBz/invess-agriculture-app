
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import InvoicesList from './InvoicesList';
import InvoiceDetail from './InvoiceDetail';
import { markPaid, markUnpaid } from '../../store/invoicesSlice';

export default function InvoicesScreen() {
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<any>(null);

  const handleSelect = (inv: any) => setSelected(inv);
  const handleBack = () => setSelected(null);
  const handleMarkPaid = (id: string) => {
    dispatch(markPaid(id));
    setSelected(null);
  };
  const handleMarkUnpaid = (id: string) => {
    dispatch(markUnpaid(id));
    setSelected(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {!selected && (
        <InvoicesList invoices={invoices} onSelect={handleSelect} />
      )}
      {selected && (
        <InvoiceDetail invoice={selected} onBack={handleBack} onMarkPaid={handleMarkPaid} onMarkUnpaid={handleMarkUnpaid} />
      )}
    </View>
  );
}
