import React, { useState } from 'react';
import LeadTable from '../components/leads/LeadTable';
import AddLeadModal from '../components/modals/AddLeadModal';
import LeadDetailsModal from '../components/modals/LeadDetailsModal';
import FollowUpModal from '../components/modals/FollowUpModal';
import { LEADS_DATA } from '../data/mockData';
import { Plus, Download, Filter } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Leads = () => {
  const { showToast } = useToast();
  const [leads, setLeads] = useState(LEADS_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [followUpLead, setFollowUpLead] = useState(null);

  const handleAddLead = (newLead) => {
    setLeads([newLead, ...leads]);
  };

  const handleUpdateStatus = (leadId, newStatus) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Leads Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage, track and convert your business prospects.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Exporting leads to CSV... Your download will start shortly.')}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
          >
            <Plus size={18} />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      <div className="card-gradient p-1 rounded-2xl">
        <LeadTable 
          leads={leads} 
          onSelectLead={(lead) => setSelectedLead(lead)} 
          onFollowUp={(lead) => setFollowUpLead(lead)}
        />
      </div>

      <AddLeadModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddLead} 
      />

      <LeadDetailsModal 
        isOpen={!!selectedLead} 
        onClose={() => setSelectedLead(null)} 
        lead={selectedLead} 
        onUpdateStatus={handleUpdateStatus}
      />

      <FollowUpModal 
        isOpen={!!followUpLead}
        onClose={() => setFollowUpLead(null)}
        leadName={followUpLead?.name}
      />
    </div>
  );
};

export default Leads;
