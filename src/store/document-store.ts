"use client"
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from 'uuid';

// Define the document interface
export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

// Define the document store state
interface DocumentStoreState {
  documents: Document[];
  currentDocument: Document | null;
  
  // Actions
  createDocument: () => string;
  getDocument: (id: string) => Document | undefined;
  updateDocument: (id: string, updates: Partial<Omit<Document, 'id'>>) => void;
  updateDocumentContent: (id: string, content: string) => void;
  deleteDocument: (id: string) => void;
  setCurrentDocument: (document: Document | null) => void;
}

// Create the store with persistence
export const useDocumentStore = create<DocumentStoreState>()(
  persist(
    (set, get) => ({
      documents: [],
      currentDocument: null,
      
      createDocument: () => {
        const newId = uuid();
        const newDocument: Document = {
          id: newId,
          title: "Untitled Document",
          content: '<p>Hello World! 🌎️</p>',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        
        set(state => ({
          documents: [newDocument, ...state.documents],
          currentDocument: newDocument,
        }));
        
        return newId;
      },
      
      getDocument: (id) => {
        return get().documents.find(doc => doc.id === id);
      },
      
      updateDocument: (id, updates) => {
        set(state => ({
          documents: state.documents.map(doc => {
            if (doc.id === id) {
              return {
                ...doc,
                ...updates,
                updatedAt: Date.now(),
              };
            }
            return doc;
          }),
          currentDocument: state.currentDocument?.id === id 
            ? { ...state.currentDocument, ...updates, updatedAt: Date.now() } 
            : state.currentDocument
        }));
      },
      
      updateDocumentContent: (id, content) => {
        set(state => ({
          documents: state.documents.map(doc => {
            if (doc.id === id) {
              return {
                ...doc,
                content,
                updatedAt: Date.now(),
              };
            }
            return doc;
          }),
          currentDocument: state.currentDocument?.id === id 
            ? { ...state.currentDocument, content, updatedAt: Date.now() } 
            : state.currentDocument
        }));
      },
      
      deleteDocument: (id) => {
        set(state => ({
          documents: state.documents.filter(doc => doc.id !== id),
          currentDocument: state.currentDocument?.id === id ? null : state.currentDocument
        }));
      },
      
      setCurrentDocument: (document) => {
        set({ currentDocument: document });
      },
    }),
    {
      name: "document-storage", // name of the item in localStorage
    }
  )
);