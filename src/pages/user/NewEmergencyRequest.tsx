import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const urgencyLevels = [
  { value: 'high', label: 'High - Needed within 24 hours' },
  { value: 'medium', label: 'Medium - Needed within 48 hours' },
  { value: 'low', label: 'Low - Needed within a week' },
];

const NewEmergencyRequest = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    blood_type: '',
    units_needed: 1,
    hospital: '',
    patient_name: '',
    contact_number: profile?.phone || '',
    urgency_level: 'medium',
    notes: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!profile) {
      setError('User profile not found');
      setLoading(false);
      return;
    }
    
    try {
      const { error: insertError } = await supabase
        .from('emergency_requests')
        .insert({
          user_id: profile.id,
          blood_type: formData.blood_type,
          units_needed: parseInt(formData.units_needed.toString()),
          hospital: formData.hospital,
          patient_name: formData.patient_name,
          contact_number: formData.contact_number,
          urgency_level: formData.urgency_level,
          notes: formData.notes,
          status: 'open',
        });
      
      if (insertError) throw insertError;
      
      toast.success('Emergency request created successfully!');
      navigate('/emergency-requests');
    } catch (error: any) {
      setError(error.message || 'Failed to create emergency request');
      toast.error('Failed to create emergency request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Create Emergency Blood Request
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Request blood donation for emergency situations
          </p>
        </div>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="blood_type" className="block text-sm font-medium text-gray-700">
                  Blood Type Needed
                </label>
                <div className="mt-1">
                  <select
                    id="blood_type"
                    name="blood_type"
                    required
                    value={formData.blood_type}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select Blood Type</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="units_needed" className="block text-sm font-medium text-gray-700">
                  Units Needed
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="units_needed"
                    id="units_needed"
                    required
                    min="1"
                    max="20"
                    value={formData.units_needed}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="hospital" className="block text-sm font-medium text-gray-700">
                  Hospital / Medical Center
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="hospital"
                    id="hospital"
                    required
                    value={formData.hospital}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., City General Hospital"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="patient_name" className="block text-sm font-medium text-gray-700">
                  Patient Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="patient_name"
                    id="patient_name"
                    required
                    value={formData.patient_name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="contact_number"
                    id="contact_number"
                    required
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="urgency_level" className="block text-sm font-medium text-gray-700">
                  Urgency Level
                </label>
                <div className="mt-1">
                  <select
                    id="urgency_level"
                    name="urgency_level"
                    required
                    value={formData.urgency_level}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional Notes (Optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Any additional information about the emergency"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/emergency-requests')}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEmergencyRequest;