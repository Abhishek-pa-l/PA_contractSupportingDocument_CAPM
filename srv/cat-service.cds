using kpo.pa.PA_Insurance as pa from '../db/schema';

service PA_Insurance_SRV @(path: '/PA_Insurance_SRV'){
     entity Header_T as projection on pa.Header_T;
     entity Insurance_T as projection on pa.Insurance_T;
     entity Financial_guarantee_T as projection on pa.Financial_guarantee_T;
}
