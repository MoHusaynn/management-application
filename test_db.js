import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function testConnection() {
  try {
    // Test job number generation
    const { data: jobNumber, error: jobError } = await supabase
      .rpc('increment_job_number')
    
    if (jobError) throw jobError
    
    console.log('Job number test successful:', `JOB-${String(jobNumber).padStart(4, '0')}`)

    // Test invoice number generation
    const { data: invoiceNumber, error: invoiceError } = await supabase
      .rpc('increment_invoice_number')
    
    if (invoiceError) throw invoiceError
    
    console.log('Invoice number test successful:', `INV-${String(invoiceNumber).padStart(4, '0')}`)

    // Test table insertion
    const testJob = {
      job_number: `JOB-${String(jobNumber).padStart(4, '0')}`,
      invoice_number: `INV-${String(invoiceNumber).padStart(4, '0')}`,
      date: new Date().toISOString().split('T')[0],
      job_opening_day: new Date().toISOString().split('T')[0],
      payment_type: 'Cash',
      contract_type: 'Contract',
      customer: 'Test Customer',
      mobile: '1234567890',
      location: 'Test Location',
      job_type: 'Installation',
      quality: 'Standard',
      description: 'Test job',
      unit: 1,
      material_expense: 100,
      man_power: 50,
      commissions_expense: 10,
      paid: 160
    }

    const { data: insertedJob, error: insertError } = await supabase
      .from('jobs')
      .insert([testJob])
      .select()
    
    if (insertError) throw insertError
    
    console.log('Job insertion test successful:', insertedJob)
  } catch (error) {
    console.error('Database test failed:', error)
  }
}

testConnection()