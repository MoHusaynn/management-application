-- Create jobs table
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    job_number TEXT NOT NULL,
    invoice_number TEXT NOT NULL,
    date DATE NOT NULL,
    job_opening_day DATE NOT NULL,
    payment_type TEXT NOT NULL,
    contract_type TEXT NOT NULL,
    customer TEXT NOT NULL,
    mobile TEXT NOT NULL,
    location TEXT NOT NULL,
    job_type TEXT NOT NULL,
    quality TEXT NOT NULL,
    description TEXT NOT NULL,
    unit INTEGER NOT NULL,
    material_expense NUMERIC NOT NULL,
    man_power NUMERIC NOT NULL,
    commissions_expense NUMERIC NOT NULL,
    paid NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sequence for job numbers
CREATE SEQUENCE job_number_seq;

-- Create function to generate job numbers
CREATE OR REPLACE FUNCTION increment_job_number()
RETURNS INTEGER AS $$
DECLARE
    next_val INTEGER;
BEGIN
    SELECT nextval('job_number_seq') INTO next_val;
    RETURN next_val;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for invoice numbers
CREATE SEQUENCE invoice_number_seq;

-- Create function to generate invoice numbers
CREATE OR REPLACE FUNCTION increment_invoice_number()
RETURNS INTEGER AS $$
DECLARE
    next_val INTEGER;
BEGIN
    SELECT nextval('invoice_number_seq') INTO next_val;
    RETURN next_val;
END;
$$ LANGUAGE plpgsql;
