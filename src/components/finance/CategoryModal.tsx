import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal, Button, Input, Select } from '../ui';
import type { FinanceCategory, CreateCategoryRequest } from '../../types';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['income', 'expense'], { message: 'Please select a type' }),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

type CategoryForm = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryRequest) => Promise<void>;
  category?: FinanceCategory | null;
}

const typeOptions = [
  { value: 'income', label: '💰 Income' },
  { value: 'expense', label: '💸 Expense' },
];

const colorPresets = [
  '#00d4ff', // cyan
  '#00b894', // teal
  '#ff6b9d', // rose
  '#ff7675', // coral
  '#a855f7', // violet
  '#10b981', // emerald
  '#f59e0b', // amber
  '#3b82f6', // blue
];

const iconPresets = [
  '🛒',
  '🍔',
  '🏠',
  '💡',
  '🚗',
  '✈️',
  '🎮',
  '📚',
  '💰',
  '💳',
  '📈',
  '🏦',
  '💵',
  '🎁',
  '💼',
  '🏥',
  '🎬',
  '🎵',
  '🏋️',
  '⚽',
  '☕',
  '🍕',
  '🛍️',
  '📱',
];

const CategoryModal = ({ isOpen, onClose, onSubmit, category }: CategoryModalProps) => {
  const isEditing = !!category;
  const [selectedColor, setSelectedColor] = useState(colorPresets[0]);
  const [selectedIcon, setSelectedIcon] = useState(iconPresets[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        type: category.type,
        description: category.description || '',
      });
      setSelectedColor(category.color || colorPresets[0]);
      setSelectedIcon(category.icon || iconPresets[0]);
    } else {
      reset({
        name: '',
        type: 'expense',
        description: '',
      });
      setSelectedColor(colorPresets[0]);
      setSelectedIcon(iconPresets[0]);
    }
  }, [category, reset]);

  const handleFormSubmit = async (data: CategoryForm) => {
    await onSubmit({
      name: data.name,
      type: data.type,
      description: data.description,
      color: selectedColor,
      icon: selectedIcon,
    });
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Category' : 'Add Category'}
      description={
        isEditing ? 'Update the category details' : 'Create a new category for your transactions'
      }
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          {...register('name')}
          label="Name"
          placeholder="e.g., Groceries"
          error={errors.name?.message}
        />

        <Select
          {...register('type')}
          label="Type"
          options={typeOptions}
          error={errors.type?.message}
        />

        <Input
          {...register('description')}
          label="Description (optional)"
          placeholder="Brief description..."
        />

        {/* Icon Selector */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Icon</label>
          <div className="flex flex-wrap gap-2">
            {iconPresets.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setSelectedIcon(icon)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                  selectedIcon === icon
                    ? 'bg-accent-cyan/30 border-2 border-accent-cyan'
                    : 'bg-glass-light border border-glass-border hover:bg-glass-white'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {colorPresets.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full transition-all ${
                  selectedColor === color
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-800'
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting} className="flex-1">
            {isEditing ? 'Update' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryModal;
