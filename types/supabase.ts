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
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      listing_translations: {
        Row: {
          badge: string | null
          contributor_quote: string | null
          created_at: string
          description: string
          distance: string
          duration: string
          hook: string
          inclusions: string[]
          listing_id: string
          locale: Database["public"]["Enums"]["locale"]
          price_label: string
          rating: string | null
          save_badge: string | null
          title: string
          updated_at: string
        }
        Insert: {
          badge?: string | null
          contributor_quote?: string | null
          created_at?: string
          description: string
          distance: string
          duration: string
          hook: string
          inclusions?: string[]
          listing_id: string
          locale: Database["public"]["Enums"]["locale"]
          price_label: string
          rating?: string | null
          save_badge?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          badge?: string | null
          contributor_quote?: string | null
          created_at?: string
          description?: string
          distance?: string
          duration?: string
          hook?: string
          inclusions?: string[]
          listing_id?: string
          locale?: Database["public"]["Enums"]["locale"]
          price_label?: string
          rating?: string | null
          save_badge?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_translations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          background: string
          booking_message_template: string | null
          booking_product_id: string | null
          booking_type: Database["public"]["Enums"]["booking_type"]
          category: Database["public"]["Enums"]["listing_category"]
          contributor_slug: string | null
          created_at: string
          emoji: string
          emojis: string[] | null
          id: string
          is_featured: boolean
          kind: Database["public"]["Enums"]["listing_kind"]
          loops: number | null
          price: number
          price_max: number | null
          price_original: number | null
          slug: string
          status: Database["public"]["Enums"]["listing_status"]
          updated_at: string
        }
        Insert: {
          background: string
          booking_message_template?: string | null
          booking_product_id?: string | null
          booking_type: Database["public"]["Enums"]["booking_type"]
          category: Database["public"]["Enums"]["listing_category"]
          contributor_slug?: string | null
          created_at?: string
          emoji: string
          emojis?: string[] | null
          id?: string
          is_featured?: boolean
          kind: Database["public"]["Enums"]["listing_kind"]
          loops?: number | null
          price: number
          price_max?: number | null
          price_original?: number | null
          slug: string
          status?: Database["public"]["Enums"]["listing_status"]
          updated_at?: string
        }
        Update: {
          background?: string
          booking_message_template?: string | null
          booking_product_id?: string | null
          booking_type?: Database["public"]["Enums"]["booking_type"]
          category?: Database["public"]["Enums"]["listing_category"]
          contributor_slug?: string | null
          created_at?: string
          emoji?: string
          emojis?: string[] | null
          id?: string
          is_featured?: boolean
          kind?: Database["public"]["Enums"]["listing_kind"]
          loops?: number | null
          price?: number
          price_max?: number | null
          price_original?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["listing_status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_type: "klook" | "viator" | "gyg" | "whatsapp"
      listing_category:
        | "food"
        | "culture"
        | "nature"
        | "wellness"
        | "adventure"
        | "nimman"
      listing_kind: "experience" | "bundle"
      listing_status: "draft" | "published" | "archived"
      locale: "en" | "th" | "zh"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      booking_type: ["klook", "viator", "gyg", "whatsapp"],
      listing_category: [
        "food",
        "culture",
        "nature",
        "wellness",
        "adventure",
        "nimman",
      ],
      listing_kind: ["experience", "bundle"],
      listing_status: ["draft", "published", "archived"],
      locale: ["en", "th", "zh"],
    },
  },
} as const
