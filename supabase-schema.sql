-- Script SQL pour créer la table 'user' dans Supabase
-- À exécuter dans l'éditeur SQL de Supabase

CREATE TABLE IF NOT EXISTS public.user (
    id BIGSERIAL PRIMARY KEY,
    email_or_phone TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ajouter des commentaires pour clarifier les colonnes
COMMENT ON TABLE public.user IS 'Table des utilisateurs avec email/téléphone et mot de passe';
COMMENT ON COLUMN public.user.email_or_phone IS 'Email ou numéro de téléphone de l''utilisateur';
COMMENT ON COLUMN public.user.password IS 'Mot de passe de l''utilisateur';
COMMENT ON COLUMN public.user.created_at IS 'Date de création du compte';

-- Optionnel : Ajouter un index sur email_or_phone pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_user_email_or_phone ON public.user(email_or_phone);
