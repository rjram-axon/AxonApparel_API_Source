using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;
namespace AxonApparel.Business
{
    public class JobWorkBusiness : IJobWorkBusiness
    {
        IJobWorkRepository DLRep = new JobWorkRepository();


        public Response<IList<JobWorkDetails>> ListJobAddDetails(int? companyid, int? BuyerId, int? StyleId, string OrderNo, string RefNo, string BRefNo)
        {
            try
            {
                var ProductWO = DLRep.GetDataAddJobRepDetails(companyid, BuyerId, StyleId, OrderNo, RefNo, BRefNo);

                return new Response<IList<JobWorkDetails>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<JobWorkDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<JobWorkDetails>> GetLoadJobEntryDetails(string OrderNo, int StyleRowId)
        {
            try
            {
                var ProductWO = DLRep.GetDataJobRepEntryDetails(OrderNo, StyleRowId);

                return new Response<IQueryable<JobWorkDetails>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<JobWorkDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<JobOrderShipmentlist>> ListJobShipDetails(int StyleRowId)
        {
            try
            {
                var ProductWO = DLRep.GetDataShipRepDetails(StyleRowId);

                return new Response<IList<JobOrderShipmentlist>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<JobOrderShipmentlist>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<JobOrderItemlist>> ListJobItemDetails(int StyleRowId, int? ShipRowId)
        {
            try
            {
                var ProductWO = DLRep.GetDataItemRepDetails(StyleRowId, ShipRowId);

                return new Response<IList<JobOrderItemlist>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<JobOrderItemlist>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateJobEntry(JobWorkDetails JobEnty)
        {

            int? CurID = 0;
            int? ComUnitId = 0;
            int? ToAppId = 0;
            int? IsCrBy = 0;
            int? IsQcId = 0;


            if (JobEnty.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = JobEnty.CurrencyId;
            }

            if (JobEnty.ToApproveId == 0)
            {
                ToAppId = null;
            }
            else
            {
                ToAppId = JobEnty.ToApproveId;
            }
            if (JobEnty.CompanyUnitId == 0)
            {
                ComUnitId = null;
            }
            else
            {
                ComUnitId = JobEnty.CompanyUnitId;
            }
            if (JobEnty.CreatedBy == 0)
            {
                IsCrBy = null;
            }
            else
            {
                IsCrBy = JobEnty.CreatedBy;
            }
            if (JobEnty.QCId == 0)
            {
                IsQcId = null;
            }
            else
            {
                IsQcId = JobEnty.QCId;
            }

            try
            {

                AxonApparel.Repository.Job_Ord_Mas JobInsert = new AxonApparel.Repository.Job_Ord_Mas
                {
                    Order_No = JobEnty.OrderNo,
                    Job_Ord_No = JobEnty.JobOrderNo,
                    Job_Ord_Date = JobEnty.JobOrdDate,
                    Issue_Date = JobEnty.Issuedate,
                    Unit_or_other = JobEnty.UnitOrOther,
                    Sales_sample = "S",
                    Styleid = JobEnty.StyleId,
                    Supplierid = JobEnty.SupplierId,                    
                    Merch_id = JobEnty.MerchandiserId,
                    Qc_id = IsQcId,
                    Job_Order_Ref = JobEnty.Job_Order_RefNo,
                    Programmed = true,
                    Quantity = JobEnty.Quantity,
                    Exchange = JobEnty.Exchange,
                    Buyerid = JobEnty.BuyerId,
                    Companyid = JobEnty.companyid,
                    Stylerowid = JobEnty.StyleRowId,
                    Amend = "N",
                    JobOrWork = "J",
                    Rate = JobEnty.Rate,
                    Remarks = "",
                    RateType = "PR",
                    IsApproved = "N",
                    CurrencyID = CurID,//JobEnty.CurrencyId,
                    JobOrdType = "I",
                    CreatedBy = IsCrBy,
                    ProcessUnitID = ComUnitId,
                    ToApprove = ToAppId,
                    Despatch_closed = true,
                    StageId=JobEnty.StageId,
                    ExcessPer = JobEnty.ExcessPer,

                };

                AxonApparel.Repository.Job_Ord_BOMMas JobBomInsert = new AxonApparel.Repository.Job_Ord_BOMMas
                {
                    Order_No = JobEnty.OrderNo,
                    Job_Ord_No = JobEnty.JobOrderNo,
                    Styleid = JobEnty.StyleId,
                    Companyid = JobEnty.companyid,
                    Order_Qty = (long)JobEnty.JobOrderQty,
                    ToJob = 0,
                    ToWork = 0,
                    ByJob = 0,


                };
                var ItmList = new List<Job_Ord_Det>();

                foreach (var PItem in JobEnty.JobOrdShip)
                {

                    if (PItem.jobOrdqty > 0)
                    {

                        ItmList.Add(new Job_Ord_Det
                        {
                            Job_Ord_No = JobEnty.JobOrderNo,
                            Buy_ord_ship = PItem.buyordship,
                            Quantity = PItem.jobOrdqty,
                            Delivery_date = PItem.deliverydate,

                        });
                    }
                }

                var OrdListDetails = new List<Job_Ord_Color>();

                if (JobEnty.JobOrdItem != null)
                {
                    foreach (var POrderDetails in JobEnty.JobOrdItem)
                    {

                        OrdListDetails.Add(new Job_Ord_Color
                        {
                            Job_Ord_No = JobEnty.JobOrderNo,
                            buy_ord_ship = POrderDetails.BuyOrdShip,
                            colorid = POrderDetails.ColorId,
                            sizeid = POrderDetails.SizeId,
                            quantity = POrderDetails.ActualJobQuantity,
                            finish_qty = 0,
                            colorrowid = POrderDetails.ColorRowId,
                            sizerowid = POrderDetails.SizeRowId,
                            ITEMROWID = POrderDetails.ItemRowId,
                            ITEMID = POrderDetails.ItemId,
                            Rate = POrderDetails.Rate,

                        });
                    }
                }

                var SumListDetails = new List<Job_Ord_Sum>();

                if (JobEnty.JobOrdItem != null)
                {
                    foreach (var PSOrderDetails in JobEnty.JobOrdItem)
                    {

                        SumListDetails.Add(new Job_Ord_Sum
                        {
                            JobOrdNo = JobEnty.JobOrderNo,
                            Styleid = JobEnty.StyleId,
                            colorid = PSOrderDetails.ColorId,
                            sizeid = PSOrderDetails.SizeId,
                            quantity = PSOrderDetails.ActualJobQuantity,
                            finisgqty = 0,
                            colorrowid = PSOrderDetails.ColorRowId,
                            sizerowid = PSOrderDetails.SizeRowId,
                            itemrowid = PSOrderDetails.ItemRowId,
                            itemid = PSOrderDetails.ItemId,
                            ReceptQty = 0,

                        });
                    }
                }

                var BomItmList = new List<Job_Ord_BomDet>();
                if (JobEnty.BomListDet != null)
                {
                    foreach (var JobItem in JobEnty.BomListDet)
                    {

                        int? CID = 0;

                        if (JobItem.Colorid == 0)
                        {
                            CID = null;
                        }
                        else
                        {
                            CID = JobItem.Colorid;
                        }

                        int? UomID = 0;

                        if (JobItem.Uomid == 0)
                        {
                            UomID = null;
                        }
                        else
                        {
                            UomID = JobItem.Uomid;
                        }
                        int? PUomID = 0;

                        if (JobItem.Pur_UOMid == 0)
                        {
                            PUomID = null;
                        }
                        else
                        {
                            PUomID = JobItem.Pur_UOMid;
                        }

                        BomItmList.Add(new Job_Ord_BomDet
                        {
                            Job_Ord_BOMDetid = JobItem.Buyordmasdetid,
                            Job_Ord_BOMid = JobItem.Buyordmasid,
                            CSP = JobItem.CSP,
                            Prg_qty = JobItem.pgmqty,
                            Received_qty = JobItem.recvdqty,
                            ItemClosure = JobItem.ItemClosure,
                            PurForJob = JobItem.PurFor_Job,
                            BOM_qty = JobItem.JobBomQty,
                            UOMid = (int)UomID,//PItem.Uomid,
                            Itemid = JobItem.Itemid,
                            Colorid = CID,//PItem.Colorid,
                            Sizeid = JobItem.Sizeid,
                            Pur_UOMid = PUomID,//PItem.Pur_UOMid,
                            Issue_qty = JobItem.issueqty,
                            ToPurUOM = JobItem.ToPurUOM,
                            Conv_Mode = JobItem.Conv_Mode,
                            Cancel_Qty = JobItem.Cancel_Qty,
                            
                        });

                    };
                }
                //var result = repo.UpdateData(ItmList, StyRowId, OType);

                var result = DLRep.AddDetData(JobInsert, ItmList, OrdListDetails, SumListDetails, BomItmList, JobBomInsert);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<IList<Bom>> GetList(string orderno, int styleid, string OType, string StageType, string JobOrderNo)
        {

            try
            {
                var CurDetList = DLRep.GetDetList(orderno, styleid, OType, StageType, JobOrderNo);

                return new Response<IList<Bom>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<JobWorkDetails>> GetDataJobMainDetails(int? companyid, int? BuyerId, int? SupplierId, int? StyleId, string OrderNo, string RefNo, string JobOrderNo, string Fdate, string Tdate, string OrderType, string DispatchClosed)
        {
            try
            {
                var PWO = DLRep.GetDatajobMainRepDetails(companyid, BuyerId, SupplierId, StyleId, OrderNo, RefNo, JobOrderNo, Fdate, Tdate, OrderType, DispatchClosed);

                return new Response<IQueryable<JobWorkDetails>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<JobWorkDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<JobWorkDetails>> GetJobEditDetails(int Id, int StyRowId)
        {
            try
            {
                var ProdutWO = DLRep.GetDataRepEditjobDetails(Id, StyRowId);

                return new Response<IQueryable<JobWorkDetails>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<JobWorkDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<JobOrderShipmentlist>> ListJobEditShipDetails(int Id, int StyRowId)
        {
            try
            {
                var CurRGList = DLRep.GetRepEditJobShipLoad(Id, StyRowId);

                return new Response<IList<JobOrderShipmentlist>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<JobOrderShipmentlist>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<JobOrderItemlist>> ListJobEditItemDetails(int Id)
        {
            try
            {
                var CurRGList = DLRep.GetRepEditJobItemLoad(Id);

                return new Response<IList<JobOrderItemlist>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<JobOrderItemlist>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<JobWorkDetails>> GetBussStage()
        {
            try
            {
                var couList = DLRep.GetRepStageList();
                return new Response<IQueryable<JobWorkDetails>>(couList.Select(m => new Domain.JobWorkDetails
                {
                
                    Stage = m.Stage,
                    StageId = (int)(m.StageId == null ? 0 : m.StageId),
                   

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<JobWorkDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateJobWorkEntry(JobWorkDetails JobEEnty)
        {
            int? CurID = 0;
            int? ComUnitId = 0;
            int? ToAppId = 0;
            int? IsCrBy = 0;
            int? IsQcId = 0;


            if (JobEEnty.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = JobEEnty.CurrencyId;
            }

            if (JobEEnty.ToApproveId == 0)
            {
                ToAppId = null;
            }
            else
            {
                ToAppId = JobEEnty.ToApproveId;
            }
            if (JobEEnty.CompanyUnitId == 0)
            {
                ComUnitId = null;
            }
            else
            {
                ComUnitId = JobEEnty.CompanyUnitId;
            }
            if (JobEEnty.CreatedBy == 0)
            {
                IsCrBy = null;
            }
            else
            {
                IsCrBy = JobEEnty.CreatedBy;
            }
            if (JobEEnty.QCId == 0)
            {
                IsQcId = null;
            }
            else
            {
                IsQcId = JobEEnty.QCId;
            }

            try
            {

                AxonApparel.Repository.Job_Ord_Mas JobEInsert = new AxonApparel.Repository.Job_Ord_Mas
                {
                    Order_No = JobEEnty.OrderNo,
                    Job_Ord_No = JobEEnty.JobOrderNo,
                    Job_Ord_Date = JobEEnty.JobOrdDate,
                    Issue_Date = JobEEnty.Issuedate,
                    Unit_or_other = JobEEnty.UnitOrOther,
                    Sales_sample = "S",
                    Styleid = JobEEnty.StyleId,
                    Supplierid = JobEEnty.SupplierId,
                    Merch_id = JobEEnty.MerchandiserId,
                    Qc_id = IsQcId,
                    Job_Order_Ref = JobEEnty.Job_Order_RefNo,
                    Programmed = true,
                    Quantity = JobEEnty.Quantity,
                    Exchange = JobEEnty.Exchange,
                    Buyerid = JobEEnty.BuyerId,
                    Companyid = JobEEnty.companyid,
                    Stylerowid = JobEEnty.StyleRowId,
                    Amend = "N",
                    JobOrWork = "J",
                    Rate = JobEEnty.Rate,
                    Remarks = "",
                    RateType = "PR",
                    IsApproved = "N",
                    CurrencyID = CurID,//JobEnty.CurrencyId,
                    JobOrdType = "I",
                    CreatedBy = IsCrBy,
                    ProcessUnitID = ComUnitId,
                    ToApprove = ToAppId,
                    Despatch_closed = true,
                    StageId = JobEEnty.StageId,
                    ExcessPer=JobEEnty.ExcessPer,


                };

                AxonApparel.Repository.Job_Ord_BOMMas JobEBomInsert = new AxonApparel.Repository.Job_Ord_BOMMas
                {
                    Order_No = JobEEnty.OrderNo,
                    Job_Ord_No = JobEEnty.JobOrderNo,
                    Styleid = JobEEnty.StyleId,
                    Companyid = JobEEnty.companyid,
                    Order_Qty = (long)JobEEnty.JobOrderQty,
                    ToJob = 0,
                    ToWork = 0,
                    ByJob = 0,


                };
                var EItmList = new List<Job_Ord_Det>();

                foreach (var EPItem in JobEEnty.JobOrdShip)
                {

                    if (EPItem.jobOrdqty > 0)
                    {

                        EItmList.Add(new Job_Ord_Det
                        {
                            Job_Ord_No = JobEEnty.JobOrderNo,
                            Buy_ord_ship = EPItem.buyordship,
                            Quantity = EPItem.jobOrdqty,
                            Delivery_date = EPItem.deliverydate,

                        });
                    }
                }

                var EOrdListDetails = new List<Job_Ord_Color>();

                if (JobEEnty.JobOrdItem != null)
                {
                    foreach (var EPOrderDetails in JobEEnty.JobOrdItem)
                    {

                        EOrdListDetails.Add(new Job_Ord_Color
                        {
                            Job_Ord_No = JobEEnty.JobOrderNo,
                            buy_ord_ship = EPOrderDetails.BuyOrdShip,
                            colorid = EPOrderDetails.ColorId,
                            sizeid = EPOrderDetails.SizeId,
                            quantity = EPOrderDetails.ActualJobQuantity,
                            finish_qty = 0,
                            colorrowid = EPOrderDetails.ColorRowId,
                            sizerowid = EPOrderDetails.SizeRowId,
                            ITEMROWID = EPOrderDetails.ItemRowId,
                            ITEMID = EPOrderDetails.ItemId,
                            Rate = EPOrderDetails.Rate,

                        });
                    }
                }

                var ESumListDetails = new List<Job_Ord_Sum>();

                if (JobEEnty.JobOrdItem != null)
                {
                    foreach (var EPSOrderDetails in JobEEnty.JobOrdItem)
                    {

                        ESumListDetails.Add(new Job_Ord_Sum
                        {
                            JobOrdNo = JobEEnty.JobOrderNo,
                            Styleid = JobEEnty.StyleId,
                            colorid = EPSOrderDetails.ColorId,
                            sizeid = EPSOrderDetails.SizeId,
                            quantity = EPSOrderDetails.ActualJobQuantity,
                            finisgqty = 0,
                            colorrowid = EPSOrderDetails.ColorRowId,
                            sizerowid = EPSOrderDetails.SizeRowId,
                            itemrowid = EPSOrderDetails.ItemRowId,
                            itemid = EPSOrderDetails.ItemId,
                            ReceptQty = 0,

                        });
                    }
                }

                var EBomItmList = new List<Job_Ord_BomDet>();
                if (JobEEnty.BomListDet != null)
                {
                    foreach (var EJobItem in JobEEnty.BomListDet)
                    {

                        int? CID = 0;

                        if (EJobItem.Colorid == 0)
                        {
                            CID = null;
                        }
                        else
                        {
                            CID = EJobItem.Colorid;
                        }

                        int? UomID = 0;

                        if (EJobItem.Uomid == 0)
                        {
                            UomID = null;
                        }
                        else
                        {
                            UomID = EJobItem.Uomid;
                        }
                        int? PUomID = 0;

                        if (EJobItem.Pur_UOMid == 0)
                        {
                            PUomID = null;
                        }
                        else
                        {
                            PUomID = EJobItem.Pur_UOMid;
                        }

                        EBomItmList.Add(new Job_Ord_BomDet
                        {
                            Job_Ord_BOMDetid = EJobItem.Jobordmasdetid,
                            Job_Ord_BOMid = EJobItem.Jobordmasid,
                            CSP = EJobItem.CSP,
                            Prg_qty = EJobItem.pgmqty,
                            Received_qty = EJobItem.recvdqty,
                            ItemClosure = EJobItem.ItemClosure,
                            PurForJob = EJobItem.PurFor_Job,
                            BOM_qty = EJobItem.JobBomQty,//EJobItem.BOM_qty,
                            UOMid = (int)UomID,//PItem.Uomid,
                            Itemid = EJobItem.Itemid,
                            Colorid = CID,//PItem.Colorid,
                            Sizeid = EJobItem.Sizeid,
                            Pur_UOMid = PUomID,//PItem.Pur_UOMid,
                            Issue_qty = EJobItem.issueqty,
                            ToPurUOM = EJobItem.ToPurUOM,
                            Conv_Mode = EJobItem.Conv_Mode,
                            Cancel_Qty = EJobItem.Cancel_Qty,
                        });

                    };
                }


                var result = DLRep.UpdateDetData(JobEInsert, EItmList, EOrdListDetails, ESumListDetails, EBomItmList, JobEBomInsert);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteJobWorkEntry(JobWorkDetails JobDEnty)
        {
            int? CurID = 0;
            int? ComUnitId = 0;
            int? ToAppId = 0;
            int? IsCrBy = 0;
            int? IsQcId = 0;


            if (JobDEnty.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = JobDEnty.CurrencyId;
            }

            if (JobDEnty.ToApproveId == 0)
            {
                ToAppId = null;
            }
            else
            {
                ToAppId = JobDEnty.ToApproveId;
            }
            if (JobDEnty.CompanyUnitId == 0)
            {
                ComUnitId = null;
            }
            else
            {
                ComUnitId = JobDEnty.CompanyUnitId;
            }
            if (JobDEnty.CreatedBy == 0)
            {
                IsCrBy = null;
            }
            else
            {
                IsCrBy = JobDEnty.CreatedBy;
            }
            if (JobDEnty.QCId == 0)
            {
                IsQcId = null;
            }
            else
            {
                IsQcId = JobDEnty.QCId;
            }

            try
            {

                AxonApparel.Repository.Job_Ord_Mas JobDInsert = new AxonApparel.Repository.Job_Ord_Mas
                {
                    Order_No = JobDEnty.OrderNo,
                    Job_Ord_No = JobDEnty.JobOrderNo,
                    Job_Ord_Date = JobDEnty.JobOrdDate,
                    Issue_Date = JobDEnty.Issuedate,
                    Unit_or_other = JobDEnty.UnitOrOther,
                    Sales_sample = "S",
                    Styleid = JobDEnty.StyleId,
                    Supplierid = JobDEnty.SupplierId,
                    Merch_id = JobDEnty.MerchandiserId,
                    Qc_id = IsQcId,
                    Job_Order_Ref = JobDEnty.Job_Order_RefNo,
                    Programmed = true,
                    Quantity = JobDEnty.Quantity,
                    Exchange = JobDEnty.Exchange,
                    Buyerid = JobDEnty.BuyerId,
                    Companyid = JobDEnty.companyid,
                    Stylerowid = JobDEnty.StyleRowId,
                    Amend = "N",
                    JobOrWork = "J",
                    Rate = JobDEnty.Rate,
                    Remarks = "",
                    RateType = "PR",
                    IsApproved = "N",
                    CurrencyID = CurID,//JobEnty.CurrencyId,
                    JobOrdType = "I",
                    CreatedBy = IsCrBy,
                    ProcessUnitID = ComUnitId,
                    ToApprove = ToAppId,
                    Despatch_closed = true,
                    StageId = JobDEnty.StageId,
                    ExcessPer = JobDEnty.ExcessPer,

                };

                AxonApparel.Repository.Job_Ord_BOMMas JobDBomInsert = new AxonApparel.Repository.Job_Ord_BOMMas
                {
                    Order_No = JobDEnty.OrderNo,
                    Job_Ord_No = JobDEnty.JobOrderNo,
                    Styleid = JobDEnty.StyleId,
                    Companyid = JobDEnty.companyid,
                    Order_Qty = (long)JobDEnty.JobOrderQty,
                    ToJob = 0,
                    ToWork = 0,
                    ByJob = 0,


                };
                var DItmList = new List<Job_Ord_Det>();

                foreach (var EPItem in JobDEnty.JobOrdShip)
                {

                    if (EPItem.jobOrdqty > 0)
                    {

                        DItmList.Add(new Job_Ord_Det
                        {
                            Job_Ord_No = JobDEnty.JobOrderNo,
                            Buy_ord_ship = EPItem.buyordship,
                            Quantity = EPItem.jobOrdqty,
                            Delivery_date = EPItem.deliverydate,

                        });
                    }
                }

                var DOrdListDetails = new List<Job_Ord_Color>();

                if (JobDEnty.JobOrdItem != null)
                {
                    foreach (var EPOrderDetails in JobDEnty.JobOrdItem)
                    {

                        DOrdListDetails.Add(new Job_Ord_Color
                        {
                            Job_Ord_No = JobDEnty.JobOrderNo,
                            buy_ord_ship = EPOrderDetails.BuyOrdShip,
                            colorid = EPOrderDetails.ColorId,
                            sizeid = EPOrderDetails.SizeId,
                            quantity = EPOrderDetails.ActualJobQuantity,
                            finish_qty = 0,
                            colorrowid = EPOrderDetails.ColorRowId,
                            sizerowid = EPOrderDetails.SizeRowId,
                            ITEMROWID = EPOrderDetails.ItemRowId,
                            ITEMID = EPOrderDetails.ItemId,
                            Rate = EPOrderDetails.Rate,

                        });
                    }
                }

                var DSumListDetails = new List<Job_Ord_Sum>();

                if (JobDEnty.JobOrdItem != null)
                {
                    foreach (var EPSOrderDetails in JobDEnty.JobOrdItem)
                    {

                        DSumListDetails.Add(new Job_Ord_Sum
                        {
                            JobOrdNo = JobDEnty.JobOrderNo,
                            Styleid = JobDEnty.StyleId,
                            colorid = EPSOrderDetails.ColorId,
                            sizeid = EPSOrderDetails.SizeId,
                            quantity = EPSOrderDetails.ActualJobQuantity,
                            finisgqty = 0,
                            colorrowid = EPSOrderDetails.ColorRowId,
                            sizerowid = EPSOrderDetails.SizeRowId,
                            itemrowid = EPSOrderDetails.ItemRowId,
                            itemid = EPSOrderDetails.ItemId,
                            ReceptQty = 0,

                        });
                    }
                }

                var DBomItmList = new List<Job_Ord_BomDet>();
                if (JobDEnty.BomListDet != null)
                {
                    foreach (var EJobItem in JobDEnty.BomListDet)
                    {

                        int? CID = 0;

                        if (EJobItem.Colorid == 0)
                        {
                            CID = null;
                        }
                        else
                        {
                            CID = EJobItem.Colorid;
                        }

                        int? UomID = 0;

                        if (EJobItem.Uomid == 0)
                        {
                            UomID = null;
                        }
                        else
                        {
                            UomID = EJobItem.Uomid;
                        }
                        int? PUomID = 0;

                        if (EJobItem.Pur_UOMid == 0)
                        {
                            PUomID = null;
                        }
                        else
                        {
                            PUomID = EJobItem.Pur_UOMid;
                        }

                        DBomItmList.Add(new Job_Ord_BomDet
                        {
                            Job_Ord_BOMDetid = EJobItem.Buyordmasdetid,
                            Job_Ord_BOMid = EJobItem.Buyordmasid,
                            CSP = EJobItem.CSP,
                            Prg_qty = EJobItem.pgmqty,
                            Received_qty = EJobItem.recvdqty,
                            ItemClosure = EJobItem.ItemClosure,
                            PurForJob = EJobItem.PurFor_Job,
                            BOM_qty = EJobItem.BOM_qty,
                            UOMid = (int)UomID,//PItem.Uomid,
                            Itemid = EJobItem.Itemid,
                            Colorid = CID,//PItem.Colorid,
                            Sizeid = EJobItem.Sizeid,
                            Pur_UOMid = PUomID,//PItem.Pur_UOMid,
                            Issue_qty = EJobItem.issueqty,
                            ToPurUOM = EJobItem.ToPurUOM,
                            Conv_Mode = EJobItem.Conv_Mode,
                            Cancel_Qty = EJobItem.Cancel_Qty,
                        });

                    };
                }


                var result = DLRep.DeleteDetData(JobDInsert, DItmList, DOrdListDetails, DSumListDetails, DBomItmList, JobDBomInsert);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
