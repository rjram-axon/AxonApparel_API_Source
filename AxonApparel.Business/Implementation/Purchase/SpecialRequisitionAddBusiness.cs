using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class SpecialRequisitionAddBusiness : ISpecialRequisitionAddBusiness
    {
        ISpecialRequisitionAddRepository stkRep = new SpecialRequisitionAddRepository();

        public Common.Response<IQueryable<Domain.SpecialRequisition>> GetordnoDetails(int cmpid, string unit)
        {
            try
            {
                var ProductWO = stkRep.GetordernoDetails(cmpid, unit);

                return new Response<IQueryable<Domain.SpecialRequisition>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.SpecialRequisition>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.SpecialRequisition>> GetrefnoDetails(int cmpid, string orderno, string unit)
        {
            try
            {
                var ProductWO = stkRep.GetrefnoDetails(cmpid, orderno, unit);

                return new Response<IQueryable<Domain.SpecialRequisition>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.SpecialRequisition>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.SpecialRequisition>> GetstyleDetails(int cmpid, string orderno, string refno, string unit)
        {
            try
            {
                var ProductWO = stkRep.GetstyleDetails(cmpid, orderno, refno, unit);

                return new Response<IQueryable<Domain.SpecialRequisition>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.SpecialRequisition>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.SpecialRequisition>> GetwrknoDetails(int cmpid, string orderno, string refno, int styleid, string unit)
        {
            try
            {
                var ProductWO = stkRep.GetwrknoDetails(cmpid, orderno, refno, styleid, unit);

                return new Response<IQueryable<Domain.SpecialRequisition>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.SpecialRequisition>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.SpecialRequisition>> GetitmgrpDetails(string jbno)
        {
            try
            {
                var ProductWO = stkRep.GetitmgrpDetails(jbno);

                return new Response<IQueryable<Domain.SpecialRequisition>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.SpecialRequisition>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.SpecialReqDet>> GetgridDetails(string jborderno, string orderno, string refno, int styleid)
        {
            try
            {
                var ProductWO = stkRep.GetgridDetails(jborderno, orderno, refno, styleid);

                return new Response<IQueryable<Domain.SpecialReqDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.SpecialReqDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.SpecialReqDet>> GetjobgridDetails(string jborderno, string orderno, string refno, int styleid)
        {
            try
            {
                var ProductWO = stkRep.GetjobgridDetails(jborderno, orderno, refno, styleid);

                return new Response<IQueryable<Domain.SpecialReqDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.SpecialReqDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateEntry(Domain.SpecialReqMas Entry)
        {
            try
            {
                AxonApparel.Repository.Special_Req_Mas SplInsert = new AxonApparel.Repository.Special_Req_Mas
                //var ReqID = stkRep.AddData(new AxonApparel.Repository.Special_Req_Mas
                {
                    
                    Spl_Reqid=Entry.Spl_Reqid,
                    Spl_Req_No=Entry.Spl_Req_No,
                    Spl_Req_Date=Entry.Spl_Req_Date,
                    Ref_Date=Entry.Ref_Date,
                    Ref_No=Entry.Ref_No,
                    Job_Ord_No=Entry.Job_Ord_No,
                    Companyid=Entry.Companyid,
                    CompanyUnitid=Entry.CompanyUnitid,
                    Req_Remarks=Entry.Req_Remarks,
                    Req_Commit_Cancel=Entry.Req_Commit_Cancel,
                    App_By=Entry.App_By,
                   // App_Date=Entry.App_Date,
                    App_Commit_Cancel=Entry.App_Commit_Cancel,
                    App_Remarks=Entry.App_Remarks,
                    Auto_Manual=Entry.Auto_Manual,
                    Unit_Or_Other=Entry.Unit_Or_Other,
                    OrderType=Entry.OrderType,
                    App_Amend=Entry.App_Amend,
                    CreatedBy=Entry.CreatedBy,
                    Type=Entry.Type,
                    Employeeid = Entry.Employeeid

                };

                var ItmList = new List<Special_Req_Det>();

                foreach (var PItem in Entry.SplreqDet)
                {
                    if (PItem.Quantity > 0)
                    {

                        ItmList.Add(new Special_Req_Det
                        {
                            Spl_Req_Detid = PItem.Spl_Req_Detid,
                            Spl_Reqid = PItem.Spl_Reqid,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            UOMid = PItem.UOMid,
                            Quantity = PItem.Quantity,
                            App_Qty = PItem.App_Qty, //Have to change after Spl Approval 
                            Issue_Qty = PItem.Issue_Qty,
                            ReqType = PItem.ReqType,
                            //transferIn=PItem.transferIn,
                            Order_Qty = PItem.Order_Qty,
                            Received_Qty = PItem.Received_Qty,
                            Cancel_Qty = PItem.Cancel_Qty,
                            Debit_Qty = PItem.Debit_Qty,
                            Pur_UOMid = PItem.Pur_UOMid,
                            Conv_Mode = PItem.Conv_Mode,
                            ToPurUOM = PItem.ToPurUOM,
                            planned = PItem.planned,

                        });
                    }

                }
                var result = stkRep.AddDetData(SplInsert, ItmList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Update(Domain.SpecialReqMas obj)
        {
            try
            {
                 AxonApparel.Repository.Special_Req_Mas SplUpd = new AxonApparel.Repository.Special_Req_Mas
                //var ReqID = stkRep.UpdateData(new AxonApparel.Repository.Special_Req_Mas
                {

                    Spl_Reqid = obj.Spl_Reqid,
                    Spl_Req_No = obj.Spl_Req_No,
                    Spl_Req_Date=obj.Spl_Req_Date,
                    Ref_Date=obj.Ref_Date,
                    Ref_No = obj.Ref_No,
                    Job_Ord_No = obj.Job_Ord_No,
                    Companyid = obj.Companyid,
                    CompanyUnitid = obj.CompanyUnitid,
                    Req_Remarks = obj.Req_Remarks,
                    Req_Commit_Cancel = obj.Req_Commit_Cancel,
                    App_By = obj.App_By,
                    // App_Date=Entry.App_Date,
                    App_Commit_Cancel = obj.App_Commit_Cancel,
                    App_Remarks = obj.App_Remarks,
                    Auto_Manual = obj.Auto_Manual,
                    Unit_Or_Other = obj.Unit_Or_Other,
                    OrderType = obj.OrderType,
                    App_Amend = obj.App_Amend,
                    CreatedBy = obj.CreatedBy,
                    Type=obj.Type,
                    Employeeid=obj.Employeeid
                };

                var ItmList = new List<Special_Req_Det>();

                foreach (var PItem in obj.SplreqDet)
                {

                    if (PItem.Quantity > 0)
                    {
                        ItmList.Add(new Special_Req_Det
                        {
                            Spl_Req_Detid = PItem.Spl_Req_Detid,
                            Spl_Reqid = PItem.Spl_Reqid,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            UOMid = PItem.UOMid,
                            Quantity = PItem.Quantity,
                            App_Qty = PItem.App_Qty, //Have to change after Spl Approval 
                            Issue_Qty = PItem.Issue_Qty,
                            ReqType = PItem.ReqType,
                            //transferIn=PItem.transferIn,
                            Order_Qty = PItem.Order_Qty,
                            Received_Qty = PItem.Received_Qty,
                            Cancel_Qty = PItem.Cancel_Qty,
                            Debit_Qty = PItem.Debit_Qty,
                            Pur_UOMid = PItem.Pur_UOMid,
                            Conv_Mode = PItem.Conv_Mode,
                            ToPurUOM = PItem.ToPurUOM,
                            planned=PItem.planned
                        });
                    }

                }
                var result = stkRep.UpdDetData(SplUpd, ItmList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<bool> AppUpdate(Domain.SpecialReqMas obj)
        {
            try
            {
                AxonApparel.Repository.Special_Req_Mas SplUpd = new AxonApparel.Repository.Special_Req_Mas
                //var ReqID = stkRep.UpdateData(new AxonApparel.Repository.Special_Req_Mas
                {

                    Spl_Reqid = obj.Spl_Reqid,
                    Spl_Req_No = obj.Spl_Req_No,
                    Spl_Req_Date = obj.Spl_Req_Date,
                    Ref_Date = obj.Ref_Date,
                    Ref_No = obj.Ref_No,
                    Job_Ord_No = obj.Job_Ord_No,
                    Companyid = obj.Companyid,
                    CompanyUnitid = obj.CompanyUnitid,
                    Req_Remarks = obj.Req_Remarks,
                    Req_Commit_Cancel = obj.Req_Commit_Cancel,
                    App_By = obj.App_By,
                    App_Date = obj.App_Date,
                    App_Commit_Cancel = obj.App_Commit_Cancel,
                    App_Remarks = obj.App_Remarks,
                    Auto_Manual = obj.Auto_Manual,
                    Unit_Or_Other = obj.Unit_Or_Other,
                    OrderType = obj.OrderType,
                    App_Amend = obj.App_Amend,
                    CreatedBy = obj.CreatedBy,
                    Type = obj.Type

                };

                var ItmList = new List<Special_Req_Det>();

                foreach (var PItem in obj.SplreqDet)
                {

                    if (PItem.Quantity > 0)
                    {
                        ItmList.Add(new Special_Req_Det
                        {
                            Spl_Req_Detid = PItem.Spl_Req_Detid,
                            Spl_Reqid = PItem.Spl_Reqid,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            UOMid = PItem.UOMid,
                            Quantity = PItem.Quantity,
                            App_Qty = PItem.App_Qty, //Have to change after Spl Approval 
                            Issue_Qty = PItem.Issue_Qty,
                            ReqType = PItem.ReqType,
                            //transferIn=PItem.transferIn,
                            Order_Qty = PItem.Order_Qty,
                            Received_Qty = PItem.Received_Qty,
                            Cancel_Qty = PItem.Cancel_Qty,
                            Debit_Qty = PItem.Debit_Qty,
                            Pur_UOMid = PItem.Pur_UOMid,
                            Conv_Mode = PItem.Conv_Mode,
                            ToPurUOM = PItem.ToPurUOM,
                            planned=PItem.planned
                        });
                    }

                }
                var result = stkRep.AppUpdDetData(SplUpd, ItmList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> AppDelete(Domain.SpecialReqMas obj)
        {
            try
            {
                AxonApparel.Repository.Special_Req_Mas SplUpd = new AxonApparel.Repository.Special_Req_Mas
                //var ReqID = stkRep.UpdateData(new AxonApparel.Repository.Special_Req_Mas
                {

                    Spl_Reqid = obj.Spl_Reqid,
                    Spl_Req_No = obj.Spl_Req_No,
                    Spl_Req_Date = obj.Spl_Req_Date,
                    Ref_Date = obj.Ref_Date,
                    Ref_No = obj.Ref_No,
                    Job_Ord_No = obj.Job_Ord_No,
                    Companyid = obj.Companyid,
                    CompanyUnitid = obj.CompanyUnitid,
                    Req_Remarks = obj.Req_Remarks,
                    Req_Commit_Cancel = obj.Req_Commit_Cancel,
                    App_By = obj.App_By,
                    App_Date = obj.App_Date,
                    App_Commit_Cancel = obj.App_Commit_Cancel,
                    App_Remarks = obj.App_Remarks,
                    Auto_Manual = obj.Auto_Manual,
                    Unit_Or_Other = obj.Unit_Or_Other,
                    OrderType = obj.OrderType,
                    App_Amend = obj.App_Amend,
                    CreatedBy = obj.CreatedBy,
                    Type = obj.Type

                };

                var ItmList = new List<Special_Req_Det>();

                foreach (var PItem in obj.SplreqDet)
                {

                    if (PItem.Quantity > 0)
                    {
                        ItmList.Add(new Special_Req_Det
                        {
                            Spl_Req_Detid = PItem.Spl_Req_Detid,
                            Spl_Reqid = PItem.Spl_Reqid,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            UOMid = PItem.UOMid,
                            Quantity = PItem.Quantity,
                            App_Qty = PItem.App_Qty, //Have to change after Spl Approval 
                            Issue_Qty = PItem.Issue_Qty,
                            ReqType = PItem.ReqType,
                            //transferIn=PItem.transferIn,
                            Order_Qty = PItem.Order_Qty,
                            Received_Qty = PItem.Received_Qty,
                            Cancel_Qty = PItem.Cancel_Qty,
                            Debit_Qty = PItem.Debit_Qty,
                            Pur_UOMid = PItem.Pur_UOMid,
                            Conv_Mode = PItem.Conv_Mode,
                            ToPurUOM = PItem.ToPurUOM,
                            planned=PItem.planned
                        });
                    }

                }
                var result = stkRep.AppDelDetData(SplUpd, ItmList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Delete(int id)
        {
            return new Response<bool>(stkRep.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }


        public Response<IQueryable<Domain.SpecialReqDet>> GetgrideditDetails(int reqid)
        {
            try
            {
                var ProductWO = stkRep.GeteditgridDetails(reqid);

                return new Response<IQueryable<Domain.SpecialReqDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.SpecialReqDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
