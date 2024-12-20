﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AxonApparel.Repository
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Objects;
    using System.Data.Objects.DataClasses;
    using System.Linq;
    
    public partial class HouseKeepingEntities : DbContext
    {
        public HouseKeepingEntities()
            : base("name=HouseKeepingEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<User_Entry_Log> User_Entry_Log { get; set; }
        public DbSet<Role_Det> Role_Det { get; set; }
        public DbSet<Role_Mas> Role_Mas { get; set; }
        public DbSet<vw_menuname> vw_menuname { get; set; }
        public DbSet<MenuList> MenuList { get; set; }
        public DbSet<MisPathItem> Item { get; set; }
        public DbSet<Mail> Mail { get; set; }
        public DbSet<Mail_Attachments> Mail_Attachments { get; set; }
        public DbSet<Process_Tolerance> Process_Tolerance { get; set; }
        public DbSet<Report_Footer_Email> Report_Footer_Email { get; set; }
        public DbSet<Report_Footer_Process> Report_Footer_Process { get; set; }
        public DbSet<Report_Footer_Setup> Report_Footer_Setup { get; set; }
        public DbSet<MisPathUnit_of_measurement> Unit_of_measurement { get; set; }
        public DbSet<MisPathSize> Size { get; set; }
        public DbSet<MisPathProcess> Process { get; set; }
        public DbSet<Finyear> Finyear { get; set; }
        public DbSet<Prefix> Prefix { get; set; }
        public DbSet<PopMailSettings> PopMailSettings { get; set; }
        public DbSet<MisPathUsername> Username { get; set; }
        public DbSet<MisPathCompany> Company { get; set; }
        public DbSet<AlertType> AlertType { get; set; }
        public DbSet<User_Grant_AlertRights> User_Grant_AlertRights { get; set; }
        public DbSet<Popup_alert> Popup_alert { get; set; }
        public DbSet<TandA_Chat> TandA_Chat { get; set; }
        public DbSet<MisPath> MisPath { get; set; }
    
        public virtual ObjectResult<Proc_Apparel_GetMisPathDetails_Result> Proc_Apparel_GetMisPathDetails()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetMisPathDetails_Result>("Proc_Apparel_GetMisPathDetails");
        }
    
        public virtual ObjectResult<Proc_Apparel_GetOrderDespDetails_Result> Proc_Apparel_GetOrderDespDetails()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetOrderDespDetails_Result>("Proc_Apparel_GetOrderDespDetails");
        }
    
        public virtual ObjectResult<Proc_Apparel_GetOrderRunDetails_Result> Proc_Apparel_GetOrderRunDetails()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetOrderRunDetails_Result>("Proc_Apparel_GetOrderRunDetails");
        }
    
        public virtual ObjectResult<Proc_Apparel_GetOrderWiseDashDetails_Result> Proc_Apparel_GetOrderWiseDashDetails(string fromdate, string todate)
        {
            var fromdateParameter = fromdate != null ?
                new ObjectParameter("fromdate", fromdate) :
                new ObjectParameter("fromdate", typeof(string));
    
            var todateParameter = todate != null ?
                new ObjectParameter("todate", todate) :
                new ObjectParameter("todate", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetOrderWiseDashDetails_Result>("Proc_Apparel_GetOrderWiseDashDetails", fromdateParameter, todateParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_Login_Result> Proc_Apparel_Login(string username)
        {
            var usernameParameter = username != null ?
                new ObjectParameter("Username", username) :
                new ObjectParameter("Username", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_Login_Result>("Proc_Apparel_Login", usernameParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_LoginMenuList_Result> Proc_Apparel_LoginMenuList()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_LoginMenuList_Result>("Proc_Apparel_LoginMenuList");
        }
    
        public virtual int Proc_Apparel_LoginUserPassUpdate(string username, string pass, string loginStatus, string machinename)
        {
            var usernameParameter = username != null ?
                new ObjectParameter("Username", username) :
                new ObjectParameter("Username", typeof(string));
    
            var passParameter = pass != null ?
                new ObjectParameter("Pass", pass) :
                new ObjectParameter("Pass", typeof(string));
    
            var loginStatusParameter = loginStatus != null ?
                new ObjectParameter("LoginStatus", loginStatus) :
                new ObjectParameter("LoginStatus", typeof(string));
    
            var machinenameParameter = machinename != null ?
                new ObjectParameter("Machinename", machinename) :
                new ObjectParameter("Machinename", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Proc_Apparel_LoginUserPassUpdate", usernameParameter, passParameter, loginStatusParameter, machinenameParameter);
        }
    
        public virtual ObjectResult<Proc_GetPendingExchangeRate_Result> Proc_GetPendingExchangeRate(Nullable<int> pCompanyId)
        {
            var pCompanyIdParameter = pCompanyId.HasValue ?
                new ObjectParameter("pCompanyId", pCompanyId) :
                new ObjectParameter("pCompanyId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_GetPendingExchangeRate_Result>("Proc_GetPendingExchangeRate", pCompanyIdParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetRoleRightsNew_Result> Proc_Apparel_GetRoleRightsNew(Nullable<int> roleId, Nullable<int> menuid, Nullable<int> submenuid)
        {
            var roleIdParameter = roleId.HasValue ?
                new ObjectParameter("RoleId", roleId) :
                new ObjectParameter("RoleId", typeof(int));
    
            var menuidParameter = menuid.HasValue ?
                new ObjectParameter("Menuid", menuid) :
                new ObjectParameter("Menuid", typeof(int));
    
            var submenuidParameter = submenuid.HasValue ?
                new ObjectParameter("Submenuid", submenuid) :
                new ObjectParameter("Submenuid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetRoleRightsNew_Result>("Proc_Apparel_GetRoleRightsNew", roleIdParameter, menuidParameter, submenuidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_LoginCheckRinUser_Result> Proc_Apparel_LoginCheckRinUser(Nullable<int> roleId)
        {
            var roleIdParameter = roleId.HasValue ?
                new ObjectParameter("RoleId", roleId) :
                new ObjectParameter("RoleId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_LoginCheckRinUser_Result>("Proc_Apparel_LoginCheckRinUser", roleIdParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_LoginMenuListParent_Result> Proc_Apparel_LoginMenuListParent()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_LoginMenuListParent_Result>("Proc_Apparel_LoginMenuListParent");
        }
    
        public virtual ObjectResult<Proc_Apparel_LoginRole_Result> Proc_Apparel_LoginRole()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_LoginRole_Result>("Proc_Apparel_LoginRole");
        }
    
        public virtual ObjectResult<Proc_Apparel_LoginRoleDet_Result> Proc_Apparel_LoginRoleDet(Nullable<int> roleid, Nullable<int> menuid)
        {
            var roleidParameter = roleid.HasValue ?
                new ObjectParameter("roleid", roleid) :
                new ObjectParameter("roleid", typeof(int));
    
            var menuidParameter = menuid.HasValue ?
                new ObjectParameter("menuid", menuid) :
                new ObjectParameter("menuid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_LoginRoleDet_Result>("Proc_Apparel_LoginRoleDet", roleidParameter, menuidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_LoginRoleMasId_Result> Proc_Apparel_LoginRoleMasId(Nullable<int> roleid)
        {
            var roleidParameter = roleid.HasValue ?
                new ObjectParameter("roleid", roleid) :
                new ObjectParameter("roleid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_LoginRoleMasId_Result>("Proc_Apparel_LoginRoleMasId", roleidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetRoleRights_Result1> Proc_Apparel_GetRoleRights(Nullable<int> roleId)
        {
            var roleIdParameter = roleId.HasValue ?
                new ObjectParameter("RoleId", roleId) :
                new ObjectParameter("RoleId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetRoleRights_Result1>("Proc_Apparel_GetRoleRights", roleIdParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetDocSetupEmpDetails_Result> Proc_Apparel_GetDocSetupEmpDetails(Nullable<int> setupid)
        {
            var setupidParameter = setupid.HasValue ?
                new ObjectParameter("Setupid", setupid) :
                new ObjectParameter("Setupid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetDocSetupEmpDetails_Result>("Proc_Apparel_GetDocSetupEmpDetails", setupidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetDocumentSetupMaingrid_Result> Proc_Apparel_GetDocumentSetupMaingrid()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetDocumentSetupMaingrid_Result>("Proc_Apparel_GetDocumentSetupMaingrid");
        }
    
        public virtual ObjectResult<Proc_Apparel_GetDocumSetupDetails_Result> Proc_Apparel_GetDocumSetupDetails(Nullable<int> setupid)
        {
            var setupidParameter = setupid.HasValue ?
                new ObjectParameter("Setupid", setupid) :
                new ObjectParameter("Setupid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetDocumSetupDetails_Result>("Proc_Apparel_GetDocumSetupDetails", setupidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetProcessAllowDetails_Result> Proc_Apparel_GetProcessAllowDetails(Nullable<int> prId, Nullable<int> iId)
        {
            var prIdParameter = prId.HasValue ?
                new ObjectParameter("PrId", prId) :
                new ObjectParameter("PrId", typeof(int));
    
            var iIdParameter = iId.HasValue ?
                new ObjectParameter("IId", iId) :
                new ObjectParameter("IId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetProcessAllowDetails_Result>("Proc_Apparel_GetProcessAllowDetails", prIdParameter, iIdParameter);
        }
    
        public virtual int Proc_Apparel_GetProSeqSetUpdate(Nullable<int> processId, Nullable<int> seqNo)
        {
            var processIdParameter = processId.HasValue ?
                new ObjectParameter("ProcessId", processId) :
                new ObjectParameter("ProcessId", typeof(int));
    
            var seqNoParameter = seqNo.HasValue ?
                new ObjectParameter("SeqNo", seqNo) :
                new ObjectParameter("SeqNo", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Proc_Apparel_GetProSeqSetUpdate", processIdParameter, seqNoParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetPurchaseAllowDetails_Result> Proc_Apparel_GetPurchaseAllowDetails(Nullable<int> iGId, Nullable<int> iId)
        {
            var iGIdParameter = iGId.HasValue ?
                new ObjectParameter("IGId", iGId) :
                new ObjectParameter("IGId", typeof(int));
    
            var iIdParameter = iId.HasValue ?
                new ObjectParameter("IId", iId) :
                new ObjectParameter("IId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetPurchaseAllowDetails_Result>("Proc_Apparel_GetPurchaseAllowDetails", iGIdParameter, iIdParameter);
        }
    
        public virtual int Proc_Apparel_UpdateRptOption(Nullable<int> setupid)
        {
            var setupidParameter = setupid.HasValue ?
                new ObjectParameter("setupid", setupid) :
                new ObjectParameter("setupid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Proc_Apparel_UpdateRptOption", setupidParameter);
        }
    
        public virtual int Proc_Apparel_UpdReportEmail(Nullable<int> empid, Nullable<int> setupid)
        {
            var empidParameter = empid.HasValue ?
                new ObjectParameter("empid", empid) :
                new ObjectParameter("empid", typeof(int));
    
            var setupidParameter = setupid.HasValue ?
                new ObjectParameter("setupid", setupid) :
                new ObjectParameter("setupid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Proc_Apparel_UpdReportEmail", empidParameter, setupidParameter);
        }
    
        public virtual int Proc_Apparel_UpdReportProcess(Nullable<int> procid, Nullable<int> setupid, string ins)
        {
            var procidParameter = procid.HasValue ?
                new ObjectParameter("procid", procid) :
                new ObjectParameter("procid", typeof(int));
    
            var setupidParameter = setupid.HasValue ?
                new ObjectParameter("setupid", setupid) :
                new ObjectParameter("setupid", typeof(int));
    
            var insParameter = ins != null ?
                new ObjectParameter("ins", ins) :
                new ObjectParameter("ins", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Proc_Apparel_UpdReportProcess", procidParameter, setupidParameter, insParameter);
        }
    
        public virtual int Proc_Apparel_UpdRptOption(Nullable<bool> optionval, Nullable<int> optionid, Nullable<int> setupid)
        {
            var optionvalParameter = optionval.HasValue ?
                new ObjectParameter("optionval", optionval) :
                new ObjectParameter("optionval", typeof(bool));
    
            var optionidParameter = optionid.HasValue ?
                new ObjectParameter("optionid", optionid) :
                new ObjectParameter("optionid", typeof(int));
    
            var setupidParameter = setupid.HasValue ?
                new ObjectParameter("setupid", setupid) :
                new ObjectParameter("setupid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Proc_Apparel_UpdRptOption", optionvalParameter, optionidParameter, setupidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetReportOptions_Result> Proc_Apparel_GetReportOptions(Nullable<int> setupid)
        {
            var setupidParameter = setupid.HasValue ?
                new ObjectParameter("setupid", setupid) :
                new ObjectParameter("setupid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetReportOptions_Result>("Proc_Apparel_GetReportOptions", setupidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetFormRights_Result> Proc_Apparel_GetFormRights(Nullable<int> menuid, Nullable<int> roleid)
        {
            var menuidParameter = menuid.HasValue ?
                new ObjectParameter("menuid", menuid) :
                new ObjectParameter("menuid", typeof(int));
    
            var roleidParameter = roleid.HasValue ?
                new ObjectParameter("Roleid", roleid) :
                new ObjectParameter("Roleid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetFormRights_Result>("Proc_Apparel_GetFormRights", menuidParameter, roleidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetPrefixDetails_Result> Proc_Apparel_GetPrefixDetails(Nullable<int> docPreId)
        {
            var docPreIdParameter = docPreId.HasValue ?
                new ObjectParameter("DocPreId", docPreId) :
                new ObjectParameter("DocPreId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetPrefixDetails_Result>("Proc_Apparel_GetPrefixDetails", docPreIdParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_ReviseRateMainGrid_Result1> Proc_Apparel_ReviseRateMainGrid(string ordno, string refno, string transno, Nullable<int> itemId, Nullable<int> processid, Nullable<int> compid, string supptype)
        {
            var ordnoParameter = ordno != null ?
                new ObjectParameter("ordno", ordno) :
                new ObjectParameter("ordno", typeof(string));
    
            var refnoParameter = refno != null ?
                new ObjectParameter("refno", refno) :
                new ObjectParameter("refno", typeof(string));
    
            var transnoParameter = transno != null ?
                new ObjectParameter("transno", transno) :
                new ObjectParameter("transno", typeof(string));
    
            var itemIdParameter = itemId.HasValue ?
                new ObjectParameter("itemId", itemId) :
                new ObjectParameter("itemId", typeof(int));
    
            var processidParameter = processid.HasValue ?
                new ObjectParameter("processid", processid) :
                new ObjectParameter("processid", typeof(int));
    
            var compidParameter = compid.HasValue ?
                new ObjectParameter("compid", compid) :
                new ObjectParameter("compid", typeof(int));
    
            var supptypeParameter = supptype != null ?
                new ObjectParameter("supptype", supptype) :
                new ObjectParameter("supptype", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_ReviseRateMainGrid_Result1>("Proc_Apparel_ReviseRateMainGrid", ordnoParameter, refnoParameter, transnoParameter, itemIdParameter, processidParameter, compidParameter, supptypeParameter);
        }
    
        public virtual ObjectResult<string> Proc_Apparel_DbShrink(string dbname)
        {
            var dbnameParameter = dbname != null ?
                new ObjectParameter("Dbname", dbname) :
                new ObjectParameter("Dbname", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("Proc_Apparel_DbShrink", dbnameParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetRoleRightsNewAdd_Result> Proc_Apparel_GetRoleRightsNewAdd(Nullable<int> roleId, Nullable<int> menuid, Nullable<int> submenuid)
        {
            var roleIdParameter = roleId.HasValue ?
                new ObjectParameter("RoleId", roleId) :
                new ObjectParameter("RoleId", typeof(int));
    
            var menuidParameter = menuid.HasValue ?
                new ObjectParameter("Menuid", menuid) :
                new ObjectParameter("Menuid", typeof(int));
    
            var submenuidParameter = submenuid.HasValue ?
                new ObjectParameter("Submenuid", submenuid) :
                new ObjectParameter("Submenuid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetRoleRightsNewAdd_Result>("Proc_Apparel_GetRoleRightsNewAdd", roleIdParameter, menuidParameter, submenuidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetOrderWiseDashInvDetails_Result1> Proc_Apparel_GetOrderWiseDashInvDetails(string fromdate, string todate)
        {
            var fromdateParameter = fromdate != null ?
                new ObjectParameter("fromdate", fromdate) :
                new ObjectParameter("fromdate", typeof(string));
    
            var todateParameter = todate != null ?
                new ObjectParameter("todate", todate) :
                new ObjectParameter("todate", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetOrderWiseDashInvDetails_Result1>("Proc_Apparel_GetOrderWiseDashInvDetails", fromdateParameter, todateParameter);
        }
    
        public virtual int Proc_Apparel_LoginUnitUpdate(string username, string pass, Nullable<int> loginUnitid)
        {
            var usernameParameter = username != null ?
                new ObjectParameter("Username", username) :
                new ObjectParameter("Username", typeof(string));
    
            var passParameter = pass != null ?
                new ObjectParameter("Pass", pass) :
                new ObjectParameter("Pass", typeof(string));
    
            var loginUnitidParameter = loginUnitid.HasValue ?
                new ObjectParameter("LoginUnitid", loginUnitid) :
                new ObjectParameter("LoginUnitid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Proc_Apparel_LoginUnitUpdate", usernameParameter, passParameter, loginUnitidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_LoginUserPass_Result2> Proc_Apparel_LoginUserPass(string username, string pass)
        {
            var usernameParameter = username != null ?
                new ObjectParameter("Username", username) :
                new ObjectParameter("Username", typeof(string));
    
            var passParameter = pass != null ?
                new ObjectParameter("Pass", pass) :
                new ObjectParameter("Pass", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_LoginUserPass_Result2>("Proc_Apparel_LoginUserPass", usernameParameter, passParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetAlertrights_Result> Proc_Apparel_GetAlertrights(Nullable<int> alertid)
        {
            var alertidParameter = alertid.HasValue ?
                new ObjectParameter("Alertid", alertid) :
                new ObjectParameter("Alertid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetAlertrights_Result>("Proc_Apparel_GetAlertrights", alertidParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetusermailDet_Result1> Proc_Apparel_GetusermailDet(string alertName, string category, string orderNo)
        {
            var alertNameParameter = alertName != null ?
                new ObjectParameter("AlertName", alertName) :
                new ObjectParameter("AlertName", typeof(string));
    
            var categoryParameter = category != null ?
                new ObjectParameter("Category", category) :
                new ObjectParameter("Category", typeof(string));
    
            var orderNoParameter = orderNo != null ?
                new ObjectParameter("OrderNo", orderNo) :
                new ObjectParameter("OrderNo", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetusermailDet_Result1>("Proc_Apparel_GetusermailDet", alertNameParameter, categoryParameter, orderNoParameter);
        }
    
        public virtual ObjectResult<Proc_Apparel_GetPopupAlertMsg_Result> Proc_Apparel_GetPopupAlertMsg()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Proc_Apparel_GetPopupAlertMsg_Result>("Proc_Apparel_GetPopupAlertMsg");
        }
    
        public virtual int Proc_Apparel_UpdatePopupAlertStatus(Nullable<int> id)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Proc_Apparel_UpdatePopupAlertStatus", idParameter);
        }
    
        public virtual int Proc_Apparel_GetMisPathUpdate(Nullable<int> misId, Nullable<int> compId, Nullable<int> cunitId, string valiBudPur, Nullable<int> fromDays, string finYear, string asstYear, Nullable<int> dCurrencyId, string valiBudCut, string valiBudSewing, string valiBudComProdIss, string valiPOApp, string valiPOAgnInd, string valiGafiChge, string valiGstHsn, string enTranDate, string enAssDetRate, string valiBuyerWiseCosting, string valiBudRateinProces, string enJobOrdRate, string enBuyDetails, string validateAppForOpenPrg, string validatecheckBillsToInvoiceEntry, string dbPathsetup, Nullable<int> baseColorid, string validateStore, string validateProcessStore, string validateProdStore, string validateBudRateinPurinvBulk, string validateBudRateinPurinvSample, string validateBudRateinProinvBulk, string validateBudRateinProinvSample, Nullable<decimal> cuttingTolerence, string valiBudCutSam, string valiBudSewingSam, string valiBudComProdIssSam, string valibillProd, string valiBudPurSam, string valiBudProSam, string valiInvDesp, string avatar, string validatecheckBillsToComInvoiceEntry, string validatePurchaseGRNqty, string validateProcessGRNqty, string valiFabDelyIssue, string validateProgramQtyinTransfer, string validateProcessIssueLoc, string validateProcessApp, string supplierSetup, string valiBarcode, string valiQRcode)
        {
            var misIdParameter = misId.HasValue ?
                new ObjectParameter("MisId", misId) :
                new ObjectParameter("MisId", typeof(int));
    
            var compIdParameter = compId.HasValue ?
                new ObjectParameter("CompId", compId) :
                new ObjectParameter("CompId", typeof(int));
    
            var cunitIdParameter = cunitId.HasValue ?
                new ObjectParameter("CunitId", cunitId) :
                new ObjectParameter("CunitId", typeof(int));
    
            var valiBudPurParameter = valiBudPur != null ?
                new ObjectParameter("ValiBudPur", valiBudPur) :
                new ObjectParameter("ValiBudPur", typeof(string));
    
            var fromDaysParameter = fromDays.HasValue ?
                new ObjectParameter("FromDays", fromDays) :
                new ObjectParameter("FromDays", typeof(int));
    
            var finYearParameter = finYear != null ?
                new ObjectParameter("FinYear", finYear) :
                new ObjectParameter("FinYear", typeof(string));
    
            var asstYearParameter = asstYear != null ?
                new ObjectParameter("AsstYear", asstYear) :
                new ObjectParameter("AsstYear", typeof(string));
    
            var dCurrencyIdParameter = dCurrencyId.HasValue ?
                new ObjectParameter("DCurrencyId", dCurrencyId) :
                new ObjectParameter("DCurrencyId", typeof(int));
    
            var valiBudCutParameter = valiBudCut != null ?
                new ObjectParameter("ValiBudCut", valiBudCut) :
                new ObjectParameter("ValiBudCut", typeof(string));
    
            var valiBudSewingParameter = valiBudSewing != null ?
                new ObjectParameter("ValiBudSewing", valiBudSewing) :
                new ObjectParameter("ValiBudSewing", typeof(string));
    
            var valiBudComProdIssParameter = valiBudComProdIss != null ?
                new ObjectParameter("ValiBudComProdIss", valiBudComProdIss) :
                new ObjectParameter("ValiBudComProdIss", typeof(string));
    
            var valiPOAppParameter = valiPOApp != null ?
                new ObjectParameter("ValiPOApp", valiPOApp) :
                new ObjectParameter("ValiPOApp", typeof(string));
    
            var valiPOAgnIndParameter = valiPOAgnInd != null ?
                new ObjectParameter("ValiPOAgnInd", valiPOAgnInd) :
                new ObjectParameter("ValiPOAgnInd", typeof(string));
    
            var valiGafiChgeParameter = valiGafiChge != null ?
                new ObjectParameter("ValiGafiChge", valiGafiChge) :
                new ObjectParameter("ValiGafiChge", typeof(string));
    
            var valiGstHsnParameter = valiGstHsn != null ?
                new ObjectParameter("ValiGstHsn", valiGstHsn) :
                new ObjectParameter("ValiGstHsn", typeof(string));
    
            var enTranDateParameter = enTranDate != null ?
                new ObjectParameter("EnTranDate", enTranDate) :
                new ObjectParameter("EnTranDate", typeof(string));
    
            var enAssDetRateParameter = enAssDetRate != null ?
                new ObjectParameter("EnAssDetRate", enAssDetRate) :
                new ObjectParameter("EnAssDetRate", typeof(string));
    
            var valiBuyerWiseCostingParameter = valiBuyerWiseCosting != null ?
                new ObjectParameter("ValiBuyerWiseCosting", valiBuyerWiseCosting) :
                new ObjectParameter("ValiBuyerWiseCosting", typeof(string));
    
            var valiBudRateinProcesParameter = valiBudRateinProces != null ?
                new ObjectParameter("ValiBudRateinProces", valiBudRateinProces) :
                new ObjectParameter("ValiBudRateinProces", typeof(string));
    
            var enJobOrdRateParameter = enJobOrdRate != null ?
                new ObjectParameter("EnJobOrdRate", enJobOrdRate) :
                new ObjectParameter("EnJobOrdRate", typeof(string));
    
            var enBuyDetailsParameter = enBuyDetails != null ?
                new ObjectParameter("EnBuyDetails", enBuyDetails) :
                new ObjectParameter("EnBuyDetails", typeof(string));
    
            var validateAppForOpenPrgParameter = validateAppForOpenPrg != null ?
                new ObjectParameter("ValidateAppForOpenPrg", validateAppForOpenPrg) :
                new ObjectParameter("ValidateAppForOpenPrg", typeof(string));
    
            var validatecheckBillsToInvoiceEntryParameter = validatecheckBillsToInvoiceEntry != null ?
                new ObjectParameter("ValidatecheckBillsToInvoiceEntry", validatecheckBillsToInvoiceEntry) :
                new ObjectParameter("ValidatecheckBillsToInvoiceEntry", typeof(string));
    
            var dbPathsetupParameter = dbPathsetup != null ?
                new ObjectParameter("DbPathsetup", dbPathsetup) :
                new ObjectParameter("DbPathsetup", typeof(string));
    
            var baseColoridParameter = baseColorid.HasValue ?
                new ObjectParameter("BaseColorid", baseColorid) :
                new ObjectParameter("BaseColorid", typeof(int));
    
            var validateStoreParameter = validateStore != null ?
                new ObjectParameter("ValidateStore", validateStore) :
                new ObjectParameter("ValidateStore", typeof(string));
    
            var validateProcessStoreParameter = validateProcessStore != null ?
                new ObjectParameter("ValidateProcessStore", validateProcessStore) :
                new ObjectParameter("ValidateProcessStore", typeof(string));
    
            var validateProdStoreParameter = validateProdStore != null ?
                new ObjectParameter("ValidateProdStore", validateProdStore) :
                new ObjectParameter("ValidateProdStore", typeof(string));
    
            var validateBudRateinPurinvBulkParameter = validateBudRateinPurinvBulk != null ?
                new ObjectParameter("ValidateBudRateinPurinvBulk", validateBudRateinPurinvBulk) :
                new ObjectParameter("ValidateBudRateinPurinvBulk", typeof(string));
    
            var validateBudRateinPurinvSampleParameter = validateBudRateinPurinvSample != null ?
                new ObjectParameter("ValidateBudRateinPurinvSample", validateBudRateinPurinvSample) :
                new ObjectParameter("ValidateBudRateinPurinvSample", typeof(string));
    
            var validateBudRateinProinvBulkParameter = validateBudRateinProinvBulk != null ?
                new ObjectParameter("ValidateBudRateinProinvBulk", validateBudRateinProinvBulk) :
                new ObjectParameter("ValidateBudRateinProinvBulk", typeof(string));
    
            var validateBudRateinProinvSampleParameter = validateBudRateinProinvSample != null ?
                new ObjectParameter("ValidateBudRateinProinvSample", validateBudRateinProinvSample) :
                new ObjectParameter("ValidateBudRateinProinvSample", typeof(string));
    
            var cuttingTolerenceParameter = cuttingTolerence.HasValue ?
                new ObjectParameter("CuttingTolerence", cuttingTolerence) :
                new ObjectParameter("CuttingTolerence", typeof(decimal));
    
            var valiBudCutSamParameter = valiBudCutSam != null ?
                new ObjectParameter("ValiBudCutSam", valiBudCutSam) :
                new ObjectParameter("ValiBudCutSam", typeof(string));
    
            var valiBudSewingSamParameter = valiBudSewingSam != null ?
                new ObjectParameter("ValiBudSewingSam", valiBudSewingSam) :
                new ObjectParameter("ValiBudSewingSam", typeof(string));
    
            var valiBudComProdIssSamParameter = valiBudComProdIssSam != null ?
                new ObjectParameter("ValiBudComProdIssSam", valiBudComProdIssSam) :
                new ObjectParameter("ValiBudComProdIssSam", typeof(string));
    
            var valibillProdParameter = valibillProd != null ?
                new ObjectParameter("ValibillProd", valibillProd) :
                new ObjectParameter("ValibillProd", typeof(string));
    
            var valiBudPurSamParameter = valiBudPurSam != null ?
                new ObjectParameter("ValiBudPurSam", valiBudPurSam) :
                new ObjectParameter("ValiBudPurSam", typeof(string));
    
            var valiBudProSamParameter = valiBudProSam != null ?
                new ObjectParameter("ValiBudProSam", valiBudProSam) :
                new ObjectParameter("ValiBudProSam", typeof(string));
    
            var valiInvDespParameter = valiInvDesp != null ?
                new ObjectParameter("ValiInvDesp", valiInvDesp) :
                new ObjectParameter("ValiInvDesp", typeof(string));
    
            var avatarParameter = avatar != null ?
                new ObjectParameter("Avatar", avatar) :
                new ObjectParameter("Avatar", typeof(string));
    
            var validatecheckBillsToComInvoiceEntryParameter = validatecheckBillsToComInvoiceEntry != null ?
                new ObjectParameter("ValidatecheckBillsToComInvoiceEntry", validatecheckBillsToComInvoiceEntry) :
                new ObjectParameter("ValidatecheckBillsToComInvoiceEntry", typeof(string));
    
            var validatePurchaseGRNqtyParameter = validatePurchaseGRNqty != null ?
                new ObjectParameter("ValidatePurchaseGRNqty", validatePurchaseGRNqty) :
                new ObjectParameter("ValidatePurchaseGRNqty", typeof(string));
    
            var validateProcessGRNqtyParameter = validateProcessGRNqty != null ?
                new ObjectParameter("ValidateProcessGRNqty", validateProcessGRNqty) :
                new ObjectParameter("ValidateProcessGRNqty", typeof(string));
    
            var valiFabDelyIssueParameter = valiFabDelyIssue != null ?
                new ObjectParameter("ValiFabDelyIssue", valiFabDelyIssue) :
                new ObjectParameter("ValiFabDelyIssue", typeof(string));
    
            var validateProgramQtyinTransferParameter = validateProgramQtyinTransfer != null ?
                new ObjectParameter("ValidateProgramQtyinTransfer", validateProgramQtyinTransfer) :
                new ObjectParameter("ValidateProgramQtyinTransfer", typeof(string));
    
            var validateProcessIssueLocParameter = validateProcessIssueLoc != null ?
                new ObjectParameter("ValidateProcessIssueLoc", validateProcessIssueLoc) :
                new ObjectParameter("ValidateProcessIssueLoc", typeof(string));
    
            var validateProcessAppParameter = validateProcessApp != null ?
                new ObjectParameter("ValidateProcessApp", validateProcessApp) :
                new ObjectParameter("ValidateProcessApp", typeof(string));
    
            var supplierSetupParameter = supplierSetup != null ?
                new ObjectParameter("SupplierSetup", supplierSetup) :
                new ObjectParameter("SupplierSetup", typeof(string));
    
            var valiBarcodeParameter = valiBarcode != null ?
                new ObjectParameter("ValiBarcode", valiBarcode) :
                new ObjectParameter("ValiBarcode", typeof(string));
    
            var valiQRcodeParameter = valiQRcode != null ?
                new ObjectParameter("ValiQRcode", valiQRcode) :
                new ObjectParameter("ValiQRcode", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Proc_Apparel_GetMisPathUpdate", misIdParameter, compIdParameter, cunitIdParameter, valiBudPurParameter, fromDaysParameter, finYearParameter, asstYearParameter, dCurrencyIdParameter, valiBudCutParameter, valiBudSewingParameter, valiBudComProdIssParameter, valiPOAppParameter, valiPOAgnIndParameter, valiGafiChgeParameter, valiGstHsnParameter, enTranDateParameter, enAssDetRateParameter, valiBuyerWiseCostingParameter, valiBudRateinProcesParameter, enJobOrdRateParameter, enBuyDetailsParameter, validateAppForOpenPrgParameter, validatecheckBillsToInvoiceEntryParameter, dbPathsetupParameter, baseColoridParameter, validateStoreParameter, validateProcessStoreParameter, validateProdStoreParameter, validateBudRateinPurinvBulkParameter, validateBudRateinPurinvSampleParameter, validateBudRateinProinvBulkParameter, validateBudRateinProinvSampleParameter, cuttingTolerenceParameter, valiBudCutSamParameter, valiBudSewingSamParameter, valiBudComProdIssSamParameter, valibillProdParameter, valiBudPurSamParameter, valiBudProSamParameter, valiInvDespParameter, avatarParameter, validatecheckBillsToComInvoiceEntryParameter, validatePurchaseGRNqtyParameter, validateProcessGRNqtyParameter, valiFabDelyIssueParameter, validateProgramQtyinTransferParameter, validateProcessIssueLocParameter, validateProcessAppParameter, supplierSetupParameter, valiBarcodeParameter, valiQRcodeParameter);
        }
    }
}
