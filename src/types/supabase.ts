export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blood_donations: {
        Row: {
          id: string
          created_at: string
          user_id: string
          blood_type: string
          donation_date: string
          donation_center: string
          units: number
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          blood_type: string
          donation_date: string
          donation_center: string
          units: number
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          blood_type?: string
          donation_date?: string
          donation_center?: string
          units?: number
          status?: string
          notes?: string | null
        }
      }
      emergency_requests: {
        Row: {
          id: string
          created_at: string
          user_id: string
          blood_type: string
          units_needed: number
          hospital: string
          patient_name: string
          contact_number: string
          urgency_level: string
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          blood_type: string
          units_needed: number
          hospital: string
          patient_name: string
          contact_number: string
          urgency_level: string
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          blood_type?: string
          units_needed?: number
          hospital?: string
          patient_name?: string
          contact_number?: string
          urgency_level?: string
          status?: string
          notes?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          blood_type: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          is_admin: boolean
          last_donation_date: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          first_name: string
          last_name: string
          blood_type?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          is_admin?: boolean
          last_donation_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string
          last_name?: string
          blood_type?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          is_admin?: boolean
          last_donation_date?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}