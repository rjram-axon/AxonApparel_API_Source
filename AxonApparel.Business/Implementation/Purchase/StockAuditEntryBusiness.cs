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
    public class StockAuditEntryBusiness : IStockAuditEntryBusiness
    {

        IStockAuditEntryRepository SR = new StockAuditEntryRepository();

        public Response<IQueryable<StockAudit>> GetDataDropDetails(int? BMasId, int? JobId, int? Styleid, string RefNo)
        {
            try
            {
                var ProductWO = SR.GetDataDropRepDetails(BMasId, JobId, Styleid, RefNo);

                return new Response<IQueryable<StockAudit>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<StockAudit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StockAudit>> GetDataProcessDropDetails()
        {
            try
            {
                var ProductWO = SR.GetDataDropProcessRepDetails();

                return new Response<IQueryable<StockAudit>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<StockAudit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StockAuditDet>> ListGetSUItemDetails(int? Companyid, string OType, string StockType, string SupType, int? Itemid, int? item_Groupid, int? buyerid, int? Supplierid, int? StoreId, string Buy_Ord_no, string RefNo, string Job_Ord_no, int? Styleid, int? ProcessId)
        {
            try
            {
                var CurRGList = SR.GetRepSUItemRetLoad(Companyid, OType, StockType, SupType, Itemid, item_Groupid, buyerid, Supplierid, StoreId, Buy_Ord_no, RefNo, Job_Ord_no, Styleid, ProcessId);

                return new Response<IList<StockAuditDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StockAuditDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateStockAuditEntry(StockAudit POAUEntry)
        {

            bool OType;
            int? SupID = 0;
            int? StyID = 0;
            int? BuyID = 0;
            int? IsCrBy = 0;

            try
            {


                if (POAUEntry.OType == "G")
                {
                    OType = true;
                }
                else
                {
                    OType = false;
                }

                if (POAUEntry.Supplierid == 0)
                {
                    SupID = null;
                }
                else
                {
                    SupID = POAUEntry.Supplierid;
                }
                if (POAUEntry.Styleid == 0)
                {
                    StyID = null;
                }
                else
                {
                    StyID = POAUEntry.Styleid;
                }
                if (POAUEntry.buyerid == 0)
                {
                    BuyID = null;
                }
                else
                {
                    BuyID = POAUEntry.buyerid;
                }

                if (POAUEntry.CreatedBy == 0)
                {
                    IsCrBy = null;
                }
                else
                {
                    IsCrBy = POAUEntry.CreatedBy;
                }

                //var SKuID = SR.AddData(new AxonApparel.Repository.Stock_Audit_Mas
                //{


                //    Entry_No = POAUEntry.Entry_No,
                //    Entry_Date = POAUEntry.Entry_Date,
                //    Companyid = POAUEntry.Companyid,
                //    Supplierid = SupID,
                //    Remarks = POAUEntry.Remarks,
                //    buyerid = BuyID,
                //    item_Groupid = POAUEntry.item_Groupid,
                //    Buy_Ord_no = POAUEntry.Buy_Ord_no,
                //    CreatedBy = IsCrBy,
                //    Job_Ord_no = POAUEntry.Job_Ord_no,
                //    Styleid = StyID,
                //    General = OType,

                //});



                AxonApparel.Repository.Stock_Audit_Mas StkAudInsert = new AxonApparel.Repository.Stock_Audit_Mas
                {

                    Entry_No = POAUEntry.Entry_No,
                    Entry_Date = POAUEntry.Entry_Date,
                    Companyid = POAUEntry.Companyid,
                    Supplierid = SupID,
                    Remarks = POAUEntry.Remarks,
                    buyerid = BuyID,
                    item_Groupid = POAUEntry.item_Groupid,
                    Buy_Ord_no = POAUEntry.Buy_Ord_no,
                    CreatedBy = IsCrBy,
                    Job_Ord_no = POAUEntry.Job_Ord_no,
                    Styleid = StyID,
                    General = OType,

                };

                var ItmList = new List<Stock_Audit_Det>();

                foreach (var PItem in POAUEntry.StockAdDet)
                {




                    if (PItem.Shortage_Qty > 0 || PItem.Excess_Qty > 0)
                    {

                        ItmList.Add(new Stock_Audit_Det
                        {
                            AuditMasid = PItem.AuditMasid,
                            Stockid = PItem.Stockid,
                            Shortage_Qty = PItem.Shortage_Qty,
                            Excess_Qty = PItem.Excess_Qty,
                            Excess_Stockid = PItem.Excess_Stockid,
                            StockQty = PItem.ActQty,
                            Entry_no = POAUEntry.Entry_No,

                        });
                    }
                }
                var result = SR.AddDetData(StkAudInsert,ItmList, POAUEntry.Entry_No, POAUEntry.Entry_Date);



                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StockAudit>> GetDataPurAudEditDetails(int Id)
        {
            try
            {
                var ProdutWO = SR.GetDataRepAudEditDetails(Id);

                return new Response<IQueryable<StockAudit>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StockAudit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<StockAuditDet>> ListGetEditAudDetails(int? Id)
        {
            try
            {
                var CurRGList = SR.GetRepAudEditItemRetLoad(Id);

                return new Response<IList<StockAuditDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StockAuditDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdatePoAuEntry(StockAudit PoEEntry)
        {

            bool OType;
            int? SupID = 0;
            int? StyID = 0;
            int? BuyID = 0;
            int? IsCrBy = 0;

            try
            {

                var retID = SR.UpdateData(new AxonApparel.Repository.Stock_Audit_Mas
                {

                    Entry_Date = PoEEntry.Entry_Date,
                    Remarks = PoEEntry.Remarks,
                    Audit_MasId = PoEEntry.Audit_MasId,
                    Entry_No=PoEEntry.Entry_No,

                });

                
         

                //

                if (PoEEntry.OType == "G")
                {
                    OType = true;
                }
                else
                {
                    OType = false;
                }

                if (PoEEntry.Supplierid == 0)
                {
                    SupID = null;
                }
                else
                {
                    SupID = PoEEntry.Supplierid;
                }
                if (PoEEntry.Styleid == 0)
                {
                    StyID = null;
                }
                else
                {
                    StyID = PoEEntry.Styleid;
                }
                if (PoEEntry.buyerid == 0)
                {
                    BuyID = null;
                }
                else
                {
                    BuyID = PoEEntry.buyerid;
                }

                if (PoEEntry.CreatedBy == 0)
                {
                    IsCrBy = null;
                }
                else
                {
                    IsCrBy = PoEEntry.CreatedBy;
                }

                //var SKuID = SR.AddData(new AxonApparel.Repository.Stock_Audit_Mas
                //{


                //    Entry_No = PoEEntry.Entry_No,
                //    Entry_Date = PoEEntry.Entry_Date,
                //    Companyid = PoEEntry.Companyid,
                //    Supplierid = SupID,
                //    Remarks = PoEEntry.Remarks,
                //    buyerid = BuyID,
                //    item_Groupid = PoEEntry.item_Groupid,
                //    Buy_Ord_no = PoEEntry.Buy_Ord_no,
                //    CreatedBy = IsCrBy,
                //    Job_Ord_no = PoEEntry.Job_Ord_no,
                //    Styleid = StyID,
                //    General = OType,

                //});



                AxonApparel.Repository.Stock_Audit_Mas StkAudEdit = new AxonApparel.Repository.Stock_Audit_Mas
                {

                    Entry_No = PoEEntry.Entry_No,
                    Entry_Date = PoEEntry.Entry_Date,
                    Companyid = PoEEntry.Companyid,
                    Supplierid = SupID,
                    Remarks = PoEEntry.Remarks,
                    buyerid = BuyID,
                    item_Groupid = PoEEntry.item_Groupid,
                    Buy_Ord_no = PoEEntry.Buy_Ord_no,
                    CreatedBy = IsCrBy,
                    Job_Ord_no = PoEEntry.Job_Ord_no,
                    Styleid = StyID,
                    General = OType,

                };

                var ItmList1 = new List<Stock_Audit_Det>();

                foreach (var PItem in PoEEntry.StockAdDet)
                {




                    if (PItem.Shortage_Qty > 0 || PItem.Excess_Qty > 0)
                    {

                        ItmList1.Add(new Stock_Audit_Det
                        {
                            AuditMasid = PItem.AuditMasid,
                            Stockid = PItem.Stockid,
                            Shortage_Qty = PItem.Shortage_Qty,
                            Excess_Qty = PItem.Excess_Qty,
                            Excess_Stockid = PItem.Excess_Stockid,
                            StockQty = PItem.ActQty,
                            Entry_no = PoEEntry.Entry_No,

                        });
                    }
                }
                var result2 = SR.AddDetData(StkAudEdit,ItmList1, PoEEntry.Entry_No, PoEEntry.Entry_Date);



                return new Response<bool>(result2, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteAudit(StockAudit PoDEntry)
        {
            try
            {
                
                var SKuID = SR.DeleteData(new AxonApparel.Repository.Stock_Audit_Mas
                {
                    
                    Entry_No = PoDEntry.Entry_No,                    

                });


                return new Response<bool>(SKuID, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
