sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
function (Controller) {
    "use strict";

    return Controller.extend("pa.insurancedocument.painsurancedocumentui.controller.View1", {
        onInit: function () {
            this.getView().setModel(new JSONModel(), "fileData");
            let oFormModel=new JSONModel([{
                contract:"",
                customer:"",
                history:"",
                validityStart:"",
                expiryDate:"",
                iDateOfSubmission:"",
                fDateOfSubmission:""

            }])
            this.getView().setModel(oFormModel,"formModel")
            let date=new Date();
            let formModel=this.getView().getModel("formModel")
            formModel.setProperty("/iDateOfSubmission",date)
            formModel.setProperty("/fDateOfSubmission",date)

        },
        
        onFileChange: function (oEvent) {
            const oFile = oEvent.getParameter("files")[0];
            const oFileUploaderId = oEvent.getSource().getId();
            const reader = new FileReader();
            const oModel = this.getView().getModel("fileData");
        
            if (oFileUploaderId.includes("fileUploader") && !oFileUploaderId.includes("fileUploader2")) {
                oModel.setProperty("/uploadInsuranceAttachment", null);
                console.log("Cleared previous Insurance Attachment");
            } else if (oFileUploaderId.includes("fileUploader2")) {
                oModel.setProperty("/uploadFinancialAttachment", null);
                console.log("Cleared previous Financial Attachment");
            }
        
            reader.onload = function(e) {
                const sBase64 = e.target.result.split(",")[1]; 
        
                if (oFileUploaderId.includes("fileUploader") && !oFileUploaderId.includes("fileUploader2")) {
                    oModel.setProperty("/uploadInsuranceAttachment", sBase64);
                    console.log("Base64 Encoded Insurance File Content:", sBase64);
                } else if (oFileUploaderId.includes("fileUploader2")) {
                    oModel.setProperty("/uploadFinancialAttachment", sBase64);
                    console.log("Base64 Encoded Financial File Content:", sBase64);
                }
            };
            
            reader.readAsDataURL(oFile);
        
            MessageToast.show("File selected: " + oFile.name);
        },

        

        onSave: function () {
            let oModel = this.getOwnerComponent().getModel();
            let insuranceData = [];
            let financeData = [];
            let oFileDataModel = this.getView().getModel("fileData");
        
            // Insurance Data
            let validityStart = this.getView().byId("validitystart").getDateValue();
            let expiryDate = this.getView().byId("expirydate").getDateValue();
            let dateOfSubmission = this.getView().byId("submissiondate").getDateValue();
            let sInsuranceFileData = oFileDataModel.getProperty("/uploadInsuranceAttachment");
            let sFinancialFileData = oFileDataModel.getProperty("/uploadFinancialAttachment");
            debugger

        
            insuranceData.push({
                validityStart: validityStart,
                expiryDate: expiryDate,
                dateOfSubmission: dateOfSubmission,
                uploadInsuranceAttachment: sInsuranceFileData
            });
        
            // Financial Data
            // let sFinancialFileData = oFileDataModel.getProperty("/uploadFinancialAttachment");
            // console.log("aa",sFinancialFileData);
        
            // if (!sFinancialFileData) {
            //     console.error("Financial File Data is not available");
            // }
        
            financeData.push({
                dateOfSubmission: dateOfSubmission,
                uploadFinancialAttachment: sFinancialFileData
            });
        
            let payload = {
                contract: "con10001",
                customer: "kpo",
                history: "history",
                insurance_item: insuranceData,
                financial_item: financeData
            };
        
            oModel.create("/Header_T", payload, {
                success: function () {
                    MessageToast.show("Data saved successfully!");
                },
                error: function (oError) {
                    MessageToast.show("Error while saving data.");
                }
            });
        },
        // onDlt: function(){
        //     let oModel = this.getOwnerComponent().getModel();
        //     oModel.remove("/Financial_guarantee_T(32f98e7c-0bec-40e9-9daf-804ae50d64b5)",{
        //         success:function(){
        //             MessageToast.show("dlt")
        //         },
        //         error:function(){
        //             MessageToast.show("dlt")

        //         }
        //     })
        // }
    });
});
