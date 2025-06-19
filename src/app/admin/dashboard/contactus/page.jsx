'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance'; // your custom axios instance

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get('/contact-us/all-contacts');
        setContacts(res.data.data || []); // adapt based on your backend response
        console.log(res.data.data)
      } catch (err) {
        console.error('Error fetching contacts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Contacts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-5 border">
              <h2 className="text-lg font-semibold mb-2 text-pink-700">{contact.title}</h2>
              <p className="text-gray-600"><strong>Phone:</strong> {contact.phone}</p>
              <p className="text-gray-800 mt-2">{contact.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
