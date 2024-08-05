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
    public class PurchaseReturnEntryBusiness : IPurchaseReturnEntryBusiness
    {
        IPurchaseReturnEntryRepository GRRep = new PurchaseReturnEntryRepository();

        public Response<IQueryable<PurchaseOrder>> GetDataSuppDetails(int? CompId)
        {
            try
            {
                var ProductWO = GRRep.GetDataSuppRepDetails(CompId);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataGrnDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType)
        {
            try
            {
                var ProductWO = GRRep.GetDataGrnRepDetails(companyid, SupplierId, Purchase_Type, EType);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseOrder>> GetDataPoDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType)
        {
            try
            {
                var ProductWO = GRRep.GetDataPoRepDetails(companyid, SupplierId, Purchase_Type, EType);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataWrkDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id)
        {
            try
            {
                var ProductWO = GRRep.GetDataWrkRepDetails(companyid, SupplierId, Purchase_Type, EType, pur_ord_id);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataOrdDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id)
        {
            try
            {
                var ProductWO = GRRep.GetDataOrdRepDetails(companyid, SupplierId, Purchase_Type, EType, pur_ord_id);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataStyleDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, string OrderNo, string job_ord_no)
        {
            try
            {
                var ProductWO = GRRep.GetDataStyRepDetails(companyid, SupplierId, Purchase_Type, EType, OrderNo, job_ord_no);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataGrnDcDetails(int? GrnMasId, string Purchase_Type)
        {
            try
            {
                var ProductWO = GRRep.GetDataDcRepDetails(GrnMasId, Purchase_Type);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseReturnDet>> ListGetRetDetails(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string OType, string EType)
        {
            try
            {
                var CurRGList = GRRep.GetRepGrnItemRetLoad(CompanyID, SupplierID, storeid, PurOrGrnNo, OType, EType);

                return new Response<IList<PurchaseReturnDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseReturnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePReturnEntry(PurchaseReturn POGEntry)
        {
            

            try
            {

      


                AxonApparel.Repository.Pur_return_mas purretInsert = new AxonApparel.Repository.Pur_return_mas
                {
                    Return_no = POGEntry.Return_no,
                    Return_date = POGEntry.Return_date,
                    CompanyID = POGEntry.CompanyID,
                    SupplierID = POGEntry.SupplierID,
                    Remarks = POGEntry.Remarks,
                    ReturnType = POGEntry.Ordtype,
                    storeid = POGEntry.storeid,
                    PurOrGrn = POGEntry.PurOrGrn,
                    PurOrGrnNo = POGEntry.PurOrGrnNo,
                    CreatedBy = POGEntry.CreatedBy,
                    Ordtype = POGEntry.Ordtype

                };

                var ItmList = new List<Pur_Return_Det>();

                foreach (var PItem in POGEntry.PurReturnDet)
                {

                    


                    if (PItem.Return_qty > 0)
                    {

                        ItmList.Add(new Pur_Return_Det
                        {
                            Return_ID = PItem.Return_ID,
                            Stockid = PItem.Stockid,
                            Return_qty = PItem.Return_qty,
                            Pur_return_qty = PItem.Pur_return_qty,                            

                        });
                    }
                }
               // var result = GRRep.AddDetData(purretInsert,ItmList);

                var STItmList = new List<Item_stock_outward>();

                foreach (var POTItem in POGEntry.PurReturnDet)
                {
                    int? StorunitId = 0;

                    if (POGEntry.storeid == 0)
                    {
                        StorunitId = null;
                    }
                    else
                    {
                        StorunitId = POGEntry.storeid;
                    }

                    if (POTItem.Return_qty > 0)
                    {

                        STItmList.Add(new Item_stock_outward
                        {
                            TransNo = POTItem.transno,
                            TransType = "PRT",
                            Itemstockid = POTItem.Stockid,
                            Quantity = POTItem.Return_qty,
                            outwarddate = POGEntry.Return_date,
                            Unitid=POTItem.UnitId,
                            rate=POTItem.rate,
                            joborderno=POTItem.jobno,
                            StoreUnitID = StorunitId,
                            Unit_Or_Other = POGEntry.Ordtype,
                            
                        });
                    }
                }
                var result = GRRep.StockOutData(purretInsert, ItmList,STItmList, POGEntry.PurOrGrn, POGEntry.Return_no);
                

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseReturn>> GetDataPurRetEditDetails(int Id)
        {
            try
            {
                var ProdutWO = GRRep.GetDataRepRetEditDetails(Id);

                return new Response<IQueryable<PurchaseReturn>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseReturnDet>> ListGetEditRetDetails(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string OType, string EType, int? Return_ID)
        {
            try
            {
                var CurRGList = GRRep.GetRepGrnEditItemRetLoad(CompanyID, SupplierID, storeid, PurOrGrnNo, OType, EType, Return_ID);

                return new Response<IList<PurchaseReturnDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseReturnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdatePoREntry(PurchaseReturn PoEEntry)
        {
            try
            {

                //var retID = GRRep.UpdateData(new AxonApparel.Repository.Pur_return_mas
                //{
                    
                //    Return_date = PoEEntry.Return_date,                   
                //    Remarks = PoEEntry.Remarks,
                //    Return_ID=PoEEntry.Return_ID,
                 
                //});

                AxonApparel.Repository.Pur_return_mas purretEdit = new AxonApparel.Repository.Pur_return_mas
                {
                    Return_date = PoEEntry.Return_date,
                    Remarks = PoEEntry.Remarks,
                    Return_ID = PoEEntry.Return_ID,

                };
                

                var STItmList = new List<Item_stock_outward>();

                foreach (var POTItem in PoEEntry.PurReturnDet)
                {
                    int? StorunitId = 0;

                    if (PoEEntry.storeid == 0)
                    {
                        StorunitId = null;
                    }
                    else
                    {
                        StorunitId = PoEEntry.storeid;
                    }

                    if (POTItem.Return_qty > 0)
                    {

                        STItmList.Add(new Item_stock_outward
                        {
                            TransNo = POTItem.transno,
                            TransType = "PRT",
                            Itemstockid = POTItem.Stockid,
                            Quantity = POTItem.Return_qty,
                            outwarddate = PoEEntry.Return_date,
                            Unitid = POTItem.UnitId,
                            rate = POTItem.rate,
                            joborderno = POTItem.jobno,
                            StoreUnitID = StorunitId,
                            Unit_Or_Other = PoEEntry.Ordtype,
                            

                        });
                    }
                }
                var result1 = GRRep.UpdateStockOutData(purretEdit,STItmList, PoEEntry.PurOrGrn, PoEEntry.Return_no);


                //var ItmList = new List<Pur_Return_Det>();

                //foreach (var PItem in PoEEntry.PurReturnDet)
                //{




                //    if (PItem.Return_qty > 0)
                //    {

                //        ItmList.Add(new Pur_Return_Det
                //        {
                //            Return_ID = PItem.Return_ID,
                //            Stockid = PItem.Stockid,
                //            Return_qty = PItem.Return_qty,
                //            Pur_return_qty = PItem.Pur_return_qty,

                //        });
                //    }
                //}
                //var result = GRRep.UpdateDetData(ItmList);


                //var STItmListA = new List<Item_stock_outward>();

                //foreach (var POTItem in PoEEntry.PurReturnDet)
                //{
                //    int? StorunitId = 0;

                //    if (PoEEntry.storeid == 0)
                //    {
                //        StorunitId = null;
                //    }
                //    else
                //    {
                //        StorunitId = PoEEntry.storeid;
                //    }

                //    if (POTItem.Return_qty > 0)
                //    {

                //        STItmListA.Add(new Item_stock_outward
                //        {
                //            TransNo = POTItem.transno,
                //            TransType = "PRT",
                //            Itemstockid = POTItem.Stockid,
                //            Quantity = POTItem.Return_qty,
                //            outwarddate = PoEEntry.Return_date,
                //            Unitid = POTItem.UnitId,
                //            rate = POTItem.rate,
                //            joborderno = POTItem.jobno,
                //            StoreUnitID = StorunitId,
                //            Unit_Or_Other = PoEEntry.Ordtype,


                //        });
                //    }
                //}
                //var result3 = GRRep.UpdateStockOutInsData(STItmListA, PoEEntry.PurOrGrn, PoEEntry.Return_no);

                //Edit
               var ItmList1 = new List<Pur_Return_Det>();

               foreach (var PItem in PoEEntry.PurReturnDet)
                {

                    


                    if (PItem.Return_qty > 0 )
                    {

                        ItmList1.Add(new Pur_Return_Det
                        {
                            Return_ID = PoEEntry.Return_ID,
                            Stockid = PItem.Stockid,
                            Return_qty = PItem.Return_qty,
                            Pur_return_qty = PItem.Pur_return_qty,                            

                        });
                    }
                }
              

                var STItmList1 = new List<Item_stock_outward>();

                foreach (var POTItem in PoEEntry.PurReturnDet)
                {
                    int? StorunitId = 0;

                    if (PoEEntry.storeid == 0)
                    {
                        StorunitId = null;
                    }
                    else
                    {
                        StorunitId = PoEEntry.storeid;
                    }

                    if (POTItem.Return_qty > 0 )
                    {

                        STItmList1.Add(new Item_stock_outward
                        {
                            TransNo = POTItem.transno,
                            TransType = "PRT",
                            Itemstockid = POTItem.Stockid,
                            Quantity = POTItem.Return_qty,
                            outwarddate = PoEEntry.Return_date,
                            Unitid=POTItem.UnitId,
                            rate=POTItem.rate,
                            joborderno=POTItem.jobno,
                            StoreUnitID = StorunitId,
                            Unit_Or_Other = PoEEntry.Ordtype,
                            
                        });
                    }
                }
                var result = GRRep.StockOutData(purretEdit, ItmList1,STItmList1, PoEEntry.PurOrGrn, PoEEntry.Return_no);

                //edit
                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeletePoREntry(PurchaseReturn PoDEntry)
        {
            try
            {

                //var retID = GRRep.UpdateData(new AxonApparel.Repository.Pur_return_mas
                //{

                //    Return_date = PoEEntry.Return_date,                   
                //    Remarks = PoEEntry.Remarks,
                //    Return_ID=PoEEntry.Return_ID,

                //});

                AxonApparel.Repository.Pur_return_mas purretDet = new AxonApparel.Repository.Pur_return_mas
                {
                    Return_date = PoDEntry.Return_date,
                    Remarks = PoDEntry.Remarks,
                    Return_ID = PoDEntry.Return_ID,

                };


                var STItmList = new List<Item_stock_outward>();

                foreach (var POTItem in PoDEntry.PurReturnDet)
                {
                    int? StorunitId = 0;

                    if (PoDEntry.storeid == 0)
                    {
                        StorunitId = null;
                    }
                    else
                    {
                        StorunitId = PoDEntry.storeid;
                    }

                    if (POTItem.Return_qty > 0)
                    {

                        STItmList.Add(new Item_stock_outward
                        {
                            TransNo = POTItem.transno,
                            TransType = "PRT",
                            Itemstockid = POTItem.Stockid,
                            Quantity = POTItem.Return_qty,
                            outwarddate = PoDEntry.Return_date,
                            Unitid = POTItem.UnitId,
                            rate = POTItem.rate,
                            joborderno = POTItem.jobno,
                            StoreUnitID = StorunitId,
                            Unit_Or_Other = PoDEntry.Ordtype,


                        });
                    }
                }
                var result = GRRep.DeleteStockOutData(purretDet, STItmList, PoDEntry.PurOrGrn, PoDEntry.Return_no);

                             

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
