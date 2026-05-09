import React, { useState } from 'react';
import { Search, Filter, Edit2, MoreVertical, Calendar } from 'lucide-react';
import LeadStatusBadge from './LeadStatusBadge';
import { motion } from 'framer-motion';

const LeadTable = ({ leads, onSelectLead, onFollowUp }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search clients or companies..." 
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Filter size={16} />
            <span>Status:</span>
            <select 
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredLeads.map((lead, index) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={lead.id} 
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                onClick={() => onSelectLead(lead)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-xs">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{lead.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{lead.company}</td>
                <td className="px-6 py-4">
                  <LeadStatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{lead.source}</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{lead.assignedDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSelectLead(lead); }} 
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary-600 transition-all"
                      title="Edit Lead"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onFollowUp(lead); }} 
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-amber-600 transition-all"
                      title="Schedule Follow-up"
                    >
                      <Calendar size={18} />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-500 dark:text-slate-400">No leads found matching your criteria.</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-6 px-2">
        <p className="text-sm text-slate-500">Showing {filteredLeads.length} of {leads.length} leads</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-sm disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm">1</button>
          <button className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
