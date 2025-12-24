import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Button, Input } from '../ui';
import type { FinanceCategory, FinanceJournal, CreateJournalRequest } from '../../types';
import { formatDateISO, cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

interface TransactionForm {
  title: string;
  amount: number;
  category_id: number;
  date: string;
  description?: string;
  payment_method?: string;
  location?: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateJournalRequest) => Promise<void>;
  categories: FinanceCategory[];
  transaction?: FinanceJournal | null;
}

const paymentMethods = [
  { value: 'cash', label: 'Cash' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'mobile_payment', label: 'Mobile Payment' },
  { value: 'other', label: 'Other' },
];

const TransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  transaction,
}: TransactionModalProps) => {
  const isEditing = !!transaction;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TransactionForm>({
    defaultValues: {
      title: '',
      amount: undefined as unknown as number,
      category_id: undefined as unknown as number,
      date: formatDateISO(new Date()),
      description: '',
      payment_method: '',
      location: '',
    },
  });

  useEffect(() => {
    if (transaction) {
      reset({
        title: transaction.title,
        amount: transaction.amount,
        category_id: transaction.category_id,
        date: transaction.date.split('T')[0],
        description: transaction.description || '',
        payment_method: transaction.payment_method || '',
        location: transaction.location || '',
      });
    } else {
      reset({
        title: '',
        amount: undefined as unknown as number,
        category_id: undefined as unknown as number,
        date: formatDateISO(new Date()),
        description: '',
        payment_method: '',
        location: '',
      });
    }
  }, [transaction, reset]);

  const handleFormSubmit = async (data: TransactionForm) => {
    console.log('Form submitted with data:', data);

    try {
      await onSubmit({
        title: data.title,
        amount: data.amount,
        category_id: data.category_id,
        date: data.date,
        description: data.description,
        payment_method: data.payment_method,
        location: data.location,
      });
      onClose();
      reset();
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  // Filter categories - show active ones, or all if is_active is not set
  const filteredCategories = categories.filter((c) => c.is_active !== false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Transaction' : 'Add Transaction'}
      description={isEditing ? 'Update the transaction details' : 'Record a new income or expense'}
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          {...register('title', { required: 'Title is required' })}
          label="Title"
          placeholder="e.g., Grocery shopping"
          error={errors.title?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register('amount', {
              required: 'Amount is required',
              valueAsNumber: true,
              min: { value: 0.01, message: 'Amount must be positive' },
            })}
            type="number"
            step="0.01"
            label="Amount"
            placeholder="0.00"
            error={errors.amount?.message}
          />

          <Input
            {...register('date', { required: 'Date is required' })}
            type="date"
            label="Date"
            error={errors.date?.message}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-white/70 mb-2">Category</label>
          <div className="relative">
            <Controller
              name="category_id"
              control={control}
              rules={{ required: 'Please select a category' }}
              render={({ field: { onChange, value, ...field } }) => (
                <select
                  {...field}
                  value={value ? String(value) : ''}
                  onChange={(e) => {
                    const selectedId = parseInt(e.target.value, 10);
                    console.log('Selected category ID:', selectedId);
                    onChange(selectedId);
                  }}
                  className={cn(
                    'glass-input appearance-none cursor-pointer pr-10 w-full',
                    errors.category_id && 'border-accent-rose/50'
                  )}
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map((c: any) => (
                    <option key={c.ID} value={String(c.ID)} className="bg-dark-800 text-white">
                      {c.icon || ''} {c.name}
                    </option>
                  ))}
                </select>
              )}
            />
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          </div>
          {errors.category_id && (
            <p className="mt-2 text-sm text-accent-rose">{errors.category_id.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-white/70 mb-2">Payment Method</label>
          <div className="relative">
            <select
              {...register('payment_method')}
              className="glass-input appearance-none cursor-pointer pr-10 w-full"
            >
              <option value="">Select payment method</option>
              {paymentMethods.map((pm) => (
                <option key={pm.value} value={pm.value} className="bg-dark-800 text-white">
                  {pm.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          </div>
        </div>

        <Input {...register('location')} label="Location (optional)" placeholder="e.g., Walmart" />

        <Input
          {...register('description')}
          label="Notes (optional)"
          placeholder="Additional details..."
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting} className="flex-1">
            {isEditing ? 'Update' : 'Add Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionModal;
