namespace kpo.pa.PA_Insurance;


entity Header_T{
  key ID:UUID;
  contract:String;
  customer:String;
  history:String;
  insurance_item:Composition of many Insurance_T on insurance_item.ID = $self;
  financial_item:Composition of many Financial_guarantee_T on financial_item.ID = $self;
}

entity Insurance_T{
  key ID :Association to Header_T ;
  validityStart:Date;
  expiryDate:Date;
  dateOfSubmission:Date;
  uploadInsuranceAttachment:LargeBinary;
}

entity Financial_guarantee_T{
  key ID :Association to Header_T ;
  
  dateOfSubmission:Date;
  uploadFinancialAttachment:LargeBinary;
}
