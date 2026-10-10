export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ads: {
        Row: {
          ad_objective: string | null
          category: string | null
          condition: string | null
          contact_type: string | null
          contact_value: string | null
          created_at: string | null
          description: string | null
          duration_days: number | null
          expected_result: string | null
          id: string
          images: string[] | null
          likes_count: number | null
          operation_type: string | null
          platforms: string[] | null
          price: number | null
          price_label: string | null
          status: string | null
          target_audience: string | null
          title: string
          updated_at: string | null
          user_id: string | null
          visibility_level: number | null
        }
        Insert: {
          ad_objective?: string | null
          category?: string | null
          condition?: string | null
          contact_type?: string | null
          contact_value?: string | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          expected_result?: string | null
          id?: string
          images?: string[] | null
          likes_count?: number | null
          operation_type?: string | null
          platforms?: string[] | null
          price?: number | null
          price_label?: string | null
          status?: string | null
          target_audience?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          visibility_level?: number | null
        }
        Update: {
          ad_objective?: string | null
          category?: string | null
          condition?: string | null
          contact_type?: string | null
          contact_value?: string | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          expected_result?: string | null
          id?: string
          images?: string[] | null
          likes_count?: number | null
          operation_type?: string | null
          platforms?: string[] | null
          price?: number | null
          price_label?: string | null
          status?: string | null
          target_audience?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          visibility_level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          activity_type: string | null
          address: string | null
          bank_name: string | null
          business_hours: Json | null
          certifications: string[] | null
          city: string | null
          commercial_name: string
          company_size: string | null
          company_type: string | null
          created_at: string | null
          doc_company_url: string | null
          doc_identity_url: string | null
          email: string | null
          employee_count: number | null
          fiscal_address: string | null
          iban: string | null
          id: string
          is_verified: boolean | null
          kbo_number: string | null
          legal_form: string | null
          legal_name: string | null
          logo_url: string | null
          operative_address: string | null
          phone: string | null
          photos: string[] | null
          postal_code: string | null
          quote_available: boolean | null
          rates: string | null
          registration_country: string | null
          responsible_email: string | null
          responsible_name: string | null
          responsible_phone: string | null
          responsible_position: string | null
          service_categories: string[] | null
          service_description: string | null
          service_subcategories: string[] | null
          service_zone: string | null
          specialists: string | null
          updated_at: string | null
          urgent_service: boolean | null
          user_id: string | null
          vat_number: string | null
          vat_registered: boolean
          website_url: string | null
        }
        Insert: {
          activity_type?: string | null
          address?: string | null
          bank_name?: string | null
          business_hours?: Json | null
          certifications?: string[] | null
          city?: string | null
          commercial_name: string
          company_size?: string | null
          company_type?: string | null
          created_at?: string | null
          doc_company_url?: string | null
          doc_identity_url?: string | null
          email?: string | null
          employee_count?: number | null
          fiscal_address?: string | null
          iban?: string | null
          id?: string
          is_verified?: boolean | null
          kbo_number?: string | null
          legal_form?: string | null
          legal_name?: string | null
          logo_url?: string | null
          operative_address?: string | null
          phone?: string | null
          photos?: string[] | null
          postal_code?: string | null
          quote_available?: boolean | null
          rates?: string | null
          registration_country?: string | null
          responsible_email?: string | null
          responsible_name?: string | null
          responsible_phone?: string | null
          responsible_position?: string | null
          service_categories?: string[] | null
          service_description?: string | null
          service_subcategories?: string[] | null
          service_zone?: string | null
          specialists?: string | null
          updated_at?: string | null
          urgent_service?: boolean | null
          user_id?: string | null
          vat_number?: string | null
          vat_registered?: boolean
          website_url?: string | null
        }
        Update: {
          activity_type?: string | null
          address?: string | null
          bank_name?: string | null
          business_hours?: Json | null
          certifications?: string[] | null
          city?: string | null
          commercial_name?: string
          company_size?: string | null
          company_type?: string | null
          created_at?: string | null
          doc_company_url?: string | null
          doc_identity_url?: string | null
          email?: string | null
          employee_count?: number | null
          fiscal_address?: string | null
          iban?: string | null
          id?: string
          is_verified?: boolean | null
          kbo_number?: string | null
          legal_form?: string | null
          legal_name?: string | null
          logo_url?: string | null
          operative_address?: string | null
          phone?: string | null
          photos?: string[] | null
          postal_code?: string | null
          quote_available?: boolean | null
          rates?: string | null
          registration_country?: string | null
          responsible_email?: string | null
          responsible_name?: string | null
          responsible_phone?: string | null
          responsible_position?: string | null
          service_categories?: string[] | null
          service_description?: string | null
          service_subcategories?: string[] | null
          service_zone?: string | null
          specialists?: string | null
          updated_at?: string | null
          urgent_service?: boolean | null
          user_id?: string | null
          vat_number?: string | null
          vat_registered?: boolean
          website_url?: string | null
        }
        Relationships: []
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string | null
          degree_title: string | null
          degree_type: string | null
          end_date: string | null
          id: string
          institution_name: string
          start_date: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          degree_title?: string | null
          degree_type?: string | null
          end_date?: string | null
          id?: string
          institution_name: string
          start_date: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          degree_title?: string | null
          degree_type?: string | null
          end_date?: string | null
          id?: string
          institution_name?: string
          start_date?: string
          user_id?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          item_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          item_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      freelancer_profiles: {
        Row: {
          activity_type: string | null
          address: string | null
          bank_name: string | null
          commercial_name: string | null
          created_at: string | null
          email: string | null
          gallery: string[] | null
          hourly_rate: number | null
          iban: string | null
          id: string
          is_available: boolean | null
          iva_included: boolean | null
          kbo_number: string | null
          logo_url: string | null
          personal_name: string | null
          phone: string | null
          portfolio_url: string | null
          professional_status: string | null
          quote_available: boolean | null
          rating: number | null
          registration_country: string | null
          responsible_email: string | null
          responsible_first_name: string | null
          responsible_last_name: string | null
          responsible_phone: string | null
          responsible_position: string | null
          service_categories: string[] | null
          service_description: string | null
          service_subcategories: string[] | null
          service_zone: string | null
          skills: string[] | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string | null
          vat_number: string | null
          vat_registered: boolean
          website_url: string | null
        }
        Insert: {
          activity_type?: string | null
          address?: string | null
          bank_name?: string | null
          commercial_name?: string | null
          created_at?: string | null
          email?: string | null
          gallery?: string[] | null
          hourly_rate?: number | null
          iban?: string | null
          id?: string
          is_available?: boolean | null
          iva_included?: boolean | null
          kbo_number?: string | null
          logo_url?: string | null
          personal_name?: string | null
          phone?: string | null
          portfolio_url?: string | null
          professional_status?: string | null
          quote_available?: boolean | null
          rating?: number | null
          registration_country?: string | null
          responsible_email?: string | null
          responsible_first_name?: string | null
          responsible_last_name?: string | null
          responsible_phone?: string | null
          responsible_position?: string | null
          service_categories?: string[] | null
          service_description?: string | null
          service_subcategories?: string[] | null
          service_zone?: string | null
          skills?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          vat_number?: string | null
          vat_registered?: boolean
          website_url?: string | null
        }
        Update: {
          activity_type?: string | null
          address?: string | null
          bank_name?: string | null
          commercial_name?: string | null
          created_at?: string | null
          email?: string | null
          gallery?: string[] | null
          hourly_rate?: number | null
          iban?: string | null
          id?: string
          is_available?: boolean | null
          iva_included?: boolean | null
          kbo_number?: string | null
          logo_url?: string | null
          personal_name?: string | null
          phone?: string | null
          portfolio_url?: string | null
          professional_status?: string | null
          quote_available?: boolean | null
          rating?: number | null
          registration_country?: string | null
          responsible_email?: string | null
          responsible_first_name?: string | null
          responsible_last_name?: string | null
          responsible_phone?: string | null
          responsible_position?: string | null
          service_categories?: string[] | null
          service_description?: string | null
          service_subcategories?: string[] | null
          service_zone?: string | null
          skills?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          vat_number?: string | null
          vat_registered?: boolean
          website_url?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_id: string
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string
          status: string | null
        }
        Insert: {
          applicant_id: string
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id: string
          status?: string | null
        }
        Update: {
          applicant_id?: string
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          address: string | null
          applications_count: number | null
          city: string | null
          company_name: string | null
          contact_info: string | null
          country: string | null
          created_at: string | null
          department: string | null
          description: string | null
          employment_type: string | null
          id: string
          job_type: string | null
          languages: string | null
          minimum_education: string | null
          publisher_id: string | null
          qualifications: string | null
          responsibilities: string | null
          salary_range: string | null
          soft_skills: string | null
          status: string | null
          technical_skills: string[] | null
          title: string
          updated_at: string | null
          willingness_to_travel: boolean | null
          work_mode: string | null
          years_of_experience: string | null
        }
        Insert: {
          address?: string | null
          applications_count?: number | null
          city?: string | null
          company_name?: string | null
          contact_info?: string | null
          country?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          job_type?: string | null
          languages?: string | null
          minimum_education?: string | null
          publisher_id?: string | null
          qualifications?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          soft_skills?: string | null
          status?: string | null
          technical_skills?: string[] | null
          title: string
          updated_at?: string | null
          willingness_to_travel?: boolean | null
          work_mode?: string | null
          years_of_experience?: string | null
        }
        Update: {
          address?: string | null
          applications_count?: number | null
          city?: string | null
          company_name?: string | null
          contact_info?: string | null
          country?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          job_type?: string | null
          languages?: string | null
          minimum_education?: string | null
          publisher_id?: string | null
          qualifications?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          soft_skills?: string | null
          status?: string | null
          technical_skills?: string[] | null
          title?: string
          updated_at?: string | null
          willingness_to_travel?: boolean | null
          work_mode?: string | null
          years_of_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          sender_id: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          title: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          title?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          title?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          buyer_id: string | null
          created_at: string | null
          id: string
          image_url: string | null
          notes: string | null
          price: number | null
          product_id: string | null
          quantity: number | null
          seller_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          notes?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          seller_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          notes?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          seller_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_model: string | null
          category: string | null
          colors: string[] | null
          condition: string | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          listing_type: string | null
          location: string | null
          price: number | null
          seller_id: string | null
          sizes: string[] | null
          status: string | null
          stock: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          brand_model?: string | null
          category?: string | null
          colors?: string[] | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          listing_type?: string | null
          location?: string | null
          price?: number | null
          seller_id?: string | null
          sizes?: string[] | null
          status?: string | null
          stock?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          brand_model?: string | null
          category?: string | null
          colors?: string[] | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          listing_type?: string | null
          location?: string | null
          price?: number | null
          seller_id?: string | null
          sizes?: string[] | null
          status?: string | null
          stock?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_services: {
        Row: {
          category_id: string | null
          certifications: string[] | null
          created_at: string | null
          description: string | null
          id: string
          role_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category_id?: string | null
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          role_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category_id?: string | null
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          role_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          context_id: string | null
          context_type: string | null
          created_at: string | null
          id: string
          rating: number
          reviewed_id: string | null
          reviewer_id: string | null
        }
        Insert: {
          comment?: string | null
          context_id?: string | null
          context_type?: string | null
          created_at?: string | null
          id?: string
          rating: number
          reviewed_id?: string | null
          reviewer_id?: string | null
        }
        Update: {
          comment?: string | null
          context_id?: string | null
          context_type?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          reviewed_id?: string | null
          reviewer_id?: string | null
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          role_types: string[] | null
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          role_types?: string[] | null
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          role_types?: string[] | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "service_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      service_proposals: {
        Row: {
          created_at: string | null
          description: string | null
          freelancer_id: string | null
          freelancer_name: string | null
          id: string
          price: number
          request_id: string | null
          status: string | null
          timeline: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          freelancer_id?: string | null
          freelancer_name?: string | null
          id?: string
          price: number
          request_id?: string | null
          status?: string | null
          timeline?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          freelancer_id?: string | null
          freelancer_name?: string | null
          id?: string
          price?: number
          request_id?: string | null
          status?: string | null
          timeline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_proposals_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          category: string | null
          city: string | null
          created_at: string | null
          description: string | null
          id: string
          quotation_conversation_id: string | null
          requester_id: string | null
          selected_freelancer_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          quotation_conversation_id?: string | null
          requester_id?: string | null
          selected_freelancer_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          quotation_conversation_id?: string | null
          requester_id?: string | null
          selected_freelancer_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      skills_catalog: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_profile_types: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean
          profile_type: Database["public"]["Enums"]["profile_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean
          profile_type: Database["public"]["Enums"]["profile_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean
          profile_type?: Database["public"]["Enums"]["profile_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_types_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          activity_types: string[] | null
          address: string | null
          avatar_url: string | null
          background_url: string | null
          bio: string | null
          city: string | null
          created_at: string | null
          description: string | null
          email: string | null
          fcm_token: string | null
          first_name: string | null
          id: string
          last_name: string | null
          location: string | null
          phone: string | null
          photos: string[] | null
          postal_code: string | null
          profile_completed: boolean
          rating: number | null
          role: Database["public"]["Enums"]["user_role"]
          system_role: Database["public"]["Enums"]["system_role"]
          total_reviews: number | null
          updated_at: string | null
          username: string | null
          vacation_mode: boolean
        }
        Insert: {
          activity_types?: string[] | null
          address?: string | null
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          fcm_token?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          location?: string | null
          phone?: string | null
          photos?: string[] | null
          postal_code?: string | null
          profile_completed?: boolean
          rating?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          system_role?: Database["public"]["Enums"]["system_role"]
          total_reviews?: number | null
          updated_at?: string | null
          username?: string | null
          vacation_mode?: boolean
        }
        Update: {
          activity_types?: string[] | null
          address?: string | null
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          fcm_token?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          phone?: string | null
          photos?: string[] | null
          postal_code?: string | null
          profile_completed?: boolean
          rating?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          system_role?: Database["public"]["Enums"]["system_role"]
          total_reviews?: number | null
          updated_at?: string | null
          username?: string | null
          vacation_mode?: boolean
        }
        Relationships: []
      }
      vacation_periods: {
        Row: {
          created_at: string
          end_date: string
          id: string
          start_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          start_date: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          start_date?: string
          user_id?: string
        }
        Relationships: []
      }
      work_experiences: {
        Row: {
          company_name: string
          created_at: string | null
          end_date: string | null
          id: string
          position: string
          start_date: string
          user_id: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          position: string
          start_date: string
          user_id: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          position?: string
          start_date?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_to_quotation_room: {
        Args: { p_freelancer_id: string; p_request_id: string }
        Returns: string
      }
      get_my_conversations: {
        Args: never
        Returns: {
          conversation_id: string
          last_message_at: string
          last_message_content: string
          last_message_sender_id: string
          other_user_avatar: string
          other_user_id: string
          other_user_name: string
          unread_count: number
        }[]
      }
      get_my_unread_count: { Args: never; Returns: number }
      get_or_create_conversation: {
        Args: { other_user_id: string }
        Returns: string
      }
      has_profile_type: {
        Args: { p_type: Database["public"]["Enums"]["profile_type"] }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      profile_type: "neighbor" | "professional" | "company"
      system_role: "user" | "admin"
      user_role: "neighbor" | "freelancer" | "company" | "professional"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      profile_type: ["neighbor", "professional", "company"],
      system_role: ["user", "admin"],
      user_role: ["neighbor", "freelancer", "company", "professional"],
    },
  },
} as const
