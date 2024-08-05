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
    public class PurchaseIndentBusiness : IPurchaseIndentBusiness
    {

        IPurchaseIndentRepository GRep = new PurchaseIndentRepository();


        public Response<IList<PurchaseIndentMas>> ListDetails(int? Companyid, int? BuyerId, string OrdNo, string RefNo, string JobNo, string Purchase_Type, string Purchase_itemType)
        {
            try
            {
                var CurGList = GRep.GetRepLoad(Companyid, BuyerId, OrdNo, RefNo, JobNo, Purchase_Type, Purchase_itemType);

                return new Response<IList<PurchaseIndentMas>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseIndentMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseIndentMas>> GetDataAOrderDetails(int? companyid, string OType)
        {
            try
            {
                var ProductWO = GRep.GetDataOrderRepDetails(companyid, OType);

                return new Response<IQueryable<PurchaseIndentMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseIndentMas>> GetDataABuyDetails(int? companyid, string OType)
        {
            try
            {
                var ProductWO = GRep.GetDataBuyRepDetails(companyid, OType);

                return new Response<IQueryable<PurchaseIndentMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseIndentMas>> GetDataAWorkDetails(int? companyid, string OType)
        {
            try
            {
                var ProductWO = GRep.GetDataWorkRepDetails(companyid, OType);

                return new Response<IQueryable<PurchaseIndentMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseIndentDet>> ListEntryIndItemDetails(string StyleRowId, string Purchase_Type, string Purchase_itemType)
        {
            try
            {
                var CurRGList = GRep.GetRepEntryIndItemLoad(StyleRowId, Purchase_Type, Purchase_itemType);

                return new Response<IList<PurchaseIndentDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseIndentDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PurchaseIndentOrder>> ListEntryIndOrderDetails(string StyleRowId, int ItemID, int ColorID, int SizeID, int PurUomId, int quantity, string Purchase_Type)
        {
            try
            {
                var CurRGListOrder = GRep.GetRepEntryIndOrderLoad(StyleRowId, ItemID, ColorID, SizeID, PurUomId, quantity, Purchase_Type);

                return new Response<IList<PurchaseIndentOrder>>(CurRGListOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseIndentOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePIndOrderEntry(PurchaseIndentMas POIEntry)
        {
            int? CurID = 0;
            int? MfrId = 0;
            int? ToAppId = 0;
            int? AppById = 0;
            int? IsCrBy = 0;
            int? ICurID = 0;
            int? IsPay = 0;
            decimal? ExRate = 0;
            string PayMode = "";
            string Remarks = "";
            decimal? Adv = 0;
            DateTime? CDate = null;

            if (POIEntry.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = POIEntry.CurrencyId;
            }
            if (POIEntry.Remarks == null)
            {
                Remarks = null;
            }
            else
            {
                Remarks = POIEntry.Remarks;
            }

            try
            {

                AxonApparel.Repository.Indent_Mas PurIndInsert = new AxonApparel.Repository.Indent_Mas
                {
                    IndentNo = POIEntry.IndentNo,
                    IndentDate = POIEntry.IndentDate,
                    Companyid = POIEntry.Companyid,
                    Company_unitid = POIEntry.Company_unitid,
                    Purchase_Type = POIEntry.Purchase_Type,
                    Purchase_itemType = POIEntry.Purchase_itemType,
                    Remarks = POIEntry.Remarks,
                    Cancel = POIEntry.Cancel,
                    Closed = "N",
                    Approved = POIEntry.Approved,
                    EmployeeId = POIEntry.EmployeeId,
                    Departmentid = POIEntry.Departmentid,
                    SectionID = POIEntry.SectionID,
                    //CurrencyId=POIEntry.CurrencyId,
                    CurrencyId = null,
                    IndentType = POIEntry.IndentType,
                };

                var ItmList = new List<Indent_Det>();

                foreach (var PItem in POIEntry.PurIndDet)
                {
                    if (PItem.Mfrid == 0)
                    {
                        MfrId = null;
                    }
                    else
                    {
                        MfrId = PItem.Mfrid;
                    }

                    if (PItem.Quantity > 0)
                    {
                        ItmList.Add(new Indent_Det
                        {
                            Indentdetid = PItem.Indentdetid,
                            Indentmasid = PItem.Indentmasid,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Quantity = PItem.Quantity,
                            UOMid = PItem.BaseUomid,
                            PurOrderQty = 0,
                            ReceivedQty = 0,
                            ItemRemark = PItem.ItemRemark,
                            Sec_Qty = PItem.Sec_Qty,
                            Sec_UOMid = PItem.PurUomid,
                            Mfrid = null,
                            Cancel_Qty = 0,
                            Close_Qty = 0,
                            AppQty = 0,
                            AppRate = 0,
                            BalanceQty = 0,
                            ActualAppQty = 0,
                            Rate = PItem.Rate,
                        });
                    }
                }

                var OrdListDetails = new List<Indent_BuyJob>();

                if (POIEntry.PurIndOrder != null)
                {
                    foreach (var POrderDetails in POIEntry.PurIndOrder)
                    {
                        OrdListDetails.Add(new Indent_BuyJob
                        {
                            Indent_BuyJobid = POrderDetails.Indent_BuyJobid,
                            Order_No = POrderDetails.OrderNo,
                            Quantity = POrderDetails.quantity,
                            IndentDetid = POrderDetails.IndentDetid,
                            Buy_Ord_BomDetid = POrderDetails.BuyODetId,
                            IndentMasid = POrderDetails.Indentmasid,
                            PurordQty = 0,//POrderDetails.ReceivedQty,
                            Cancel_Qty = 0,
                            ItemCode = "",//POrderDetails.ItemCode,
                            ReceivedQty = 0,//POrderDetails.ReturnQty,
                            //ReqDate = POrderDetails.ReqDate,
                            ItemRemarks = "",
                            ItemID = POrderDetails.ItemID,
                            SizeID = POrderDetails.SizeID,
                            ColorID = POrderDetails.ColorID,
                            UOMId = POrderDetails.PurUomId,
                        });
                    }
                }


                var result = GRep.AddDetData(PurIndInsert, ItmList, OrdListDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseIndentMas>> GetDataIndMainOrderRefDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = GRep.GetDataIndMoRepDetails(Companyid, Purchase_Type, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseIndentMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseIndentMas>> GetDataIndMainIndEmpDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = GRep.GetDataIndMIRepDetails(Companyid, Purchase_Type, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseIndentMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseIndentMas>> GetDataIndMainStatusDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = GRep.GetDataIndMSRepDetails(Companyid, Purchase_Type, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseIndentMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseIndentMas>> GetDataPurIndMainDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate)
        {
            try
            {
                var PWO = GRep.GetDataPurIndMainDetails(OrdNo, RefNo, Company_unitid, Companyid, SectionID, EmployeeId, IndentMasid, Purchase_Type, FrmDate, ToDate);
                return new Response<IQueryable<PurchaseIndentMas>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseIndentMas>> GetIndEditDetails(int Id)
        {
            try
            {
                var ProdutWO = GRep.GetDataRepEditIndDetails(Id);

                return new Response<IQueryable<PurchaseIndentMas>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseIndentDet>> GetEditIndDetDetails(string IndentMasid, string Purchase_Type)
        {
            try
            {
                var CurRGList = GRep.GetRepEntryEditIndItemLoad(IndentMasid, Purchase_Type);

                return new Response<IList<PurchaseIndentDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseIndentDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PurchaseIndentOrder>> GetEditIndOrdDetails(string IndentMasid, int OItemid, int OColorid, int OSizeid, int OUomid, string Purchase_Type)
        {
            try
            {
                var CurRGListOrder = GRep.GetRepEntryEditIndOrderLoad(IndentMasid, OItemid, OColorid, OSizeid, OUomid, Purchase_Type);

                return new Response<IList<PurchaseIndentOrder>>(CurRGListOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseIndentOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdatePoIndEntry(PurchaseIndentMas PoEEntry)
        {
            int? CurID = 0;
            int? MfrId = 0;
            int? ToAppId = 0;
            int? AppById = 0;
            int? IsCrBy = 0;
            int? ICurID = 0;
            int? IsPay = 0;
            decimal? ExRate = 0;
            string PayMode = "";
            string Remarks = "";
            decimal? Adv = 0;
            DateTime? CDate = null;

            if (PoEEntry.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = PoEEntry.CurrencyId;
            }
            if (PoEEntry.Remarks == null)
            {
                Remarks = null;
            }
            else
            {
                Remarks = PoEEntry.Remarks;
            }

            try
            {


                AxonApparel.Repository.Indent_Mas purIndEdit = new AxonApparel.Repository.Indent_Mas
                {

                    IndentNo = PoEEntry.IndentNo,
                    IndentDate = PoEEntry.IndentDate,
                    Companyid = PoEEntry.Companyid,
                    Company_unitid = PoEEntry.Company_unitid,
                    Purchase_Type = PoEEntry.Purchase_Type,
                    Purchase_itemType = PoEEntry.Purchase_itemType,
                    Remarks = PoEEntry.Remarks,
                    Cancel = PoEEntry.Cancel,
                    Closed = "N",
                    Approved = PoEEntry.Approved,
                    EmployeeId = PoEEntry.EmployeeId,
                    Departmentid = PoEEntry.Departmentid,
                    SectionID = PoEEntry.SectionID,
                    //CurrencyId=POIEntry.CurrencyId,
                    CurrencyId = null,
                    IndentType = PoEEntry.IndentType,
                    IndentMasid = PoEEntry.IndentMasid,


                };

                var ItmList = new List<Indent_Det>();

                foreach (var PItem in PoEEntry.PurIndDet)
                {


                    if (PItem.Quantity > 0)
                    {
                        ItmList.Add(new Indent_Det
                        {
                            Indentdetid = PItem.Indentdetid,
                            Indentmasid = PoEEntry.IndentMasid,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Quantity = PItem.Quantity,
                            UOMid = PItem.BaseUomid,
                            PurOrderQty = 0,
                            ReceivedQty = 0,
                            ItemRemark = PItem.ItemRemark,
                            Sec_Qty = PItem.Sec_Qty,
                            Sec_UOMid = PItem.PurUomid,
                            Mfrid = null,
                            Cancel_Qty = 0,
                            Close_Qty = 0,
                            AppQty = 0,
                            AppRate = 0,
                            BalanceQty = 0,
                            ActualAppQty = 0,
                            Rate = PItem.Rate,
                        });
                    }
                }

                var OrdListDetails = new List<Indent_BuyJob>();
                if (PoEEntry.PurIndOrder != null)
                {
                    foreach (var POrderDetails in PoEEntry.PurIndOrder)
                    {


                        OrdListDetails.Add(new Indent_BuyJob
                        {

                            Indent_BuyJobid = POrderDetails.Indent_BuyJobid,
                            Order_No = POrderDetails.OrderNo,
                            Quantity = POrderDetails.quantity,
                            IndentDetid = POrderDetails.IndentDetid,
                            Buy_Ord_BomDetid = POrderDetails.BuyODetId,
                            IndentMasid = PoEEntry.IndentMasid,
                            PurordQty = 0,//POrderDetails.ReceivedQty,
                            Cancel_Qty = 0,
                            ItemCode = "",//POrderDetails.ItemCode,
                            ReceivedQty = 0,//POrderDetails.ReturnQty,
                            //ReqDate = POrderDetails.ReqDate,
                            ItemRemarks = "",
                            ItemID = POrderDetails.ItemID,
                            SizeID = POrderDetails.SizeID,
                            ColorID = POrderDetails.ColorID,
                            UOMId = POrderDetails.PurUomId,


                        });
                    }
                }


                var result = GRep.UpdateDetData(purIndEdit, ItmList, OrdListDetails);


                ////Edit Case



                //var eItmList = new List<Indent_Det>();

                //foreach (var PItem in PoEEntry.PurIndDet)
                //{
                //    if (PItem.Indentdetid == 0)
                //    {
                //        if (PItem.Quantity > 0)
                //        {
                //            eItmList.Add(new Indent_Det
                //            {
                //                Indentdetid = PItem.Indentdetid,
                //                Indentmasid = PoEEntry.IndentMasid,
                //                Itemid = PItem.Itemid,
                //                Colorid = PItem.Colorid,
                //                Sizeid = PItem.Sizeid,
                //                Quantity = PItem.Quantity,
                //                UOMid = PItem.BaseUomid,
                //                PurOrderQty = 0,
                //                ReceivedQty = 0,
                //                ItemRemark = PItem.ItemRemark,
                //                Sec_Qty = PItem.Sec_Qty,
                //                Sec_UOMid = PItem.PurUomid,
                //                Mfrid = null,
                //                Cancel_Qty = 0,
                //                Close_Qty = 0,
                //                AppQty = 0,
                //                AppRate = 0,
                //                BalanceQty = 0,
                //                ActualAppQty = 0,
                //                Rate = 0,

                //            });
                //        }
                //    }
                //}

                //var result3 = GRep.AddDetData(purIndEdit, eItmList, OrdListDetails);
                //

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeletePoIndEntry(PurchaseIndentMas PoDEntry)
        {
            try
            {
                var detailOrderListEdit = new List<Indent_BuyJob>();
                if (PoDEntry.PurIndOrder != null)
                {
                    foreach (var Order in PoDEntry.PurIndOrder)
                    {



                        detailOrderListEdit.Add(new Indent_BuyJob
                        {

                            Indent_BuyJobid = Order.Indent_BuyJobid,
                            Order_No = Order.OrderNo,
                            Quantity = Order.quantity,
                            IndentDetid = Order.IndentDetid,
                            Buy_Ord_BomDetid = Order.BuyODetId,
                            IndentMasid = PoDEntry.IndentMasid,
                            PurordQty = 0,//POrderDetails.ReceivedQty,
                            Cancel_Qty = 0,
                            ItemCode = "",//POrderDetails.ItemCode,
                            ReceivedQty = 0,//POrderDetails.ReturnQty,
                            //ReqDate = POrderDetails.ReqDate,
                            ItemRemarks = "",
                            ItemID = Order.ItemID,
                            SizeID = Order.SizeID,
                            ColorID = Order.ColorID,
                            UOMId = Order.PurUomId,
                        });
                    }
                }

                var result1 = GRep.DeleteData(detailOrderListEdit, PoDEntry.IndentMasid, PoDEntry.Purchase_Type);

                return new Response<bool>(result1, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
