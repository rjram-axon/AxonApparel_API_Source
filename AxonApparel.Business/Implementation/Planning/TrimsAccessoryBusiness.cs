using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;
using System.Data.Entity;

namespace AxonApparel.Business
{
    public class TrimsAccessoryBusiness : ITrimsAccessoryBusiness
    {
        ITrimsRepository TrimsDet = new TrimsAccessoryRepository();

        public Response<IQueryable<TrimsAccessory>> GetTrimsDetails(string OrderNo)
        {
            try
            {
                var TrimsDt = TrimsDet.GetTrimsDetails(OrderNo);

                return new Response<IQueryable<TrimsAccessory>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<TrimsAccessory>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Item> GetUom(int ItemId)
        {
            try
            {
                Domain.Item itmuom = new Domain.Item();

                var TrimsDt = TrimsDet.GetUomName(ItemId);
                //string strUomname=TrimsDt.Select(c=>c.Unit_of_measurement.Uom).FirstOrDefault();
                var struom = TrimsDt.Select(d => new { d.Unit_of_measurement.UomId, d.Unit_of_measurement.Uom }).FirstOrDefault();

                itmuom.UomName = struom.Uom;
                itmuom.UomId = struom.UomId;

                return new Response<Domain.Item>(itmuom, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Item>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<TrimsSizeDetails>> GetTrimsSizeDetails(string OrderNo, int StyleId, int ItemId)
        {
            try
            {
                var TrimsDt = TrimsDet.GetTrimsSizeDetails(OrderNo, ItemId, StyleId);

                return new Response<IQueryable<TrimsSizeDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<TrimsSizeDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<TrimsStyleDetails>> GetTrimsStyleDetails(string OrderNo, int StyleId, int ItemId,int AccItemId)
        {
            try
            {
                var TrimsDt = TrimsDet.GetTrimsStyleDetails(OrderNo, ItemId, StyleId, AccItemId);

                return new Response<IQueryable<TrimsStyleDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<TrimsStyleDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<AccessoryReqMas>> GetAccReqInfo(AccessoryReqMas objdet)
        {
            try
            {
                var TrimsAccReqDet = TrimsDet.GetAccReqId(objdet);

                return new Response<IQueryable<AccessoryReqMas>>(TrimsAccReqDet, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<AccessoryReqMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<AccessoryReqMas>> GetAccReqMasDet(int AccReqid)
        {
            try
            {
                var TrimsAccReqMasandDet = TrimsDet.GetAccReqMasandDet(AccReqid);

                return new Response<IQueryable<AccessoryReqMas>>(TrimsAccReqMasandDet, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<AccessoryReqMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<AccessoryReqDet>> GetAccReqColorSizeDet(int AccReqMasid)
        {
            try
            {
                var TrimsAccReqMasandDet = TrimsDet.GetAccReqColorSizeDet(AccReqMasid);

                return new Response<IQueryable<AccessoryReqDet>>(TrimsAccReqMasandDet, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<AccessoryReqDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.TrimsColorDetails>> GetTrimsColorDetails(string OrderNo, int StyleId, int ItemId)
        {
            try
            {
                var TrimsDt = TrimsDet.GetTrimsColorDetails(OrderNo, ItemId, StyleId);

                return new Response<IList<Domain.TrimsColorDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.TrimsColorDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.TrimsColorDetails>> GetAccShipColorDetails(string Type, string OrderNo, int StyleId, int ItemId)
        {
            try
            {
                var TrimsDt = TrimsDet.GetAssignShipColorSize(Type, OrderNo, ItemId, StyleId);

                return new Response<IList<Domain.TrimsColorDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.TrimsColorDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.TrimsAccShipDet>> GetAccShipmentDet(string Type, string OrderNo, int ItemId, int StyleId)
        {
            try
            {
                var TrimsDt = TrimsDet.GetAccShipDet(Type, OrderNo, ItemId, StyleId);

                return new Response<IList<Domain.TrimsAccShipDet>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.TrimsAccShipDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.TrimsColorDetails>> GetTrimsColorDetailsForEdit(string OrderNo, int ItemId, int StyleItemId, int StyleId, int PlanType, string applytype)
        {
            try
            {
                var TrimsDt = TrimsDet.GetTrimsColorDetailsForEdit(OrderNo, ItemId, StyleItemId, StyleId, PlanType, applytype);

                return new Response<IList<Domain.TrimsColorDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.TrimsColorDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.TrimsGenAuto>> GetTrimsGeneralForEdit(string ApplyType, string OrderNo, int ItemId, int StyleItemId, int StyleId, int PlanTypeId)
        {
            try
            {
                var TrimsDt = TrimsDet.GetTrimsGeneralDetForEdit(ApplyType, OrderNo, ItemId, StyleItemId, StyleId, PlanTypeId);

                return new Response<IList<Domain.TrimsGenAuto>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.TrimsGenAuto>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.TrimsSizeDetails>> GetTrimsSizeDetailsForEdit(string OrderNo, int ItemId, int StyleId, int PlanType, int applyid, int StyleItemid)
        {
            try
            {
                var TrimsDt = TrimsDet.GetTrimsSizeDetailsForEdit(OrderNo, ItemId, StyleId, PlanType, applyid, StyleItemid);

                return new Response<IList<Domain.TrimsSizeDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.TrimsSizeDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.TrimsStyleDetails>> GetTrimsStyleDetailsForEdit(string OrderNo, int ItemId, int StyleId ,int StyleItemid)
        {
            try
            {
                var TrimsDt = TrimsDet.GetTrimsStyleDetailsForEdit(OrderNo, ItemId, StyleId, StyleItemid);

                return new Response<IList<Domain.TrimsStyleDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.TrimsStyleDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateStyleTemplate(string OrderNo, int Styleid, string Stylename)
        {
            try
            {
                var result = TrimsDet.AddStyleTemplateMaster(OrderNo, Styleid, Stylename);
                if (result)
                {
                    return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
                }
                else
                {
                    return new Response<int>(0, Status.ERROR, "Save Failed");
                }
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateAccessories(decimal Allow, decimal totqty, List<AccessoryReqMas> accreq, List<TrimsAccShipDet> accreqship, List<TrimsColorDetails> ComboColorList, List<TrimsSizeDetails> ComboSizeList, List<TrimsStyleDetails> ComboStyleList, string Orderno, DateTime Entrydate, int Styleid, int BuyOrdMasid, int ItemId, int AccColorId, int AccSizeId, int Mode, int PlanId, AccessoryReqMas accreqmasobj)
        {
            try
            {
                List<Acc_Req_Mas> accreqmas = new List<Acc_Req_Mas>();

                foreach (var item in accreq)
                {
                    accreqmas.Add(new Repository.Acc_Req_Mas
                    {
                        //AccReqID = 1,                        
                        ItemID = item.ItemId,
                        UnitId = item.Unitid,
                        RowSeq = item.itemrowseq,
                        Allowance = Allow,//item.Allowance,
                        Quantity = totqty,//item.quantity,
                        PlanType = item.Type,
                        DivMul = (item.DivMul == "Multiply" ? "M" : "D"),
                        AutoOrMan = (item.AutoOrMan == "1" ? "A" : item.AutoOrMan == "3" ? "S" : "M"),
                        Prod_or_Ord = accreqmasobj.ProdOrOrd,
                        Item_Remarks = item.ItemRemarks,
                        Add_Date = item.AddDate,
                        LockRow = item.LockRow,
                        ShipRowID = 0,
                        GenPlanType = "O",
                        Amend = "P",
                        CreatedBy = accreqmasobj.CreatedBy,
                    });
                }

                var result = TrimsDet.AddData(accreqmas, accreqship, ComboColorList, ComboSizeList, ComboStyleList, Orderno, Entrydate, Styleid, BuyOrdMasid, ItemId, AccColorId, AccSizeId, Mode, PlanId, accreqmasobj);
                if (result)
                {
                    return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
                }
                else
                {
                    return new Response<int>(0, Status.ERROR, "Save Failed");
                }
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateStyleTemplateAcc(decimal Allow, decimal totqty, string Orderno, DateTime Entrydate, int Styleid, int BuyOrdMasid, int ItemId, int AccColorId, int AccSizeId, int Mode, int PlanId, AccessoryReqMas accreqmasobj)
        {
            try
            {
                //List<Acc_Req_Mas> accreqmas = new List<Acc_Req_Mas>();

                //foreach (var item in accreq)
                //{
                //    accreqmas.Add(new Repository.Acc_Req_Mas
                //    {
                //        //AccReqID = 1,                        
                //        ItemID = item.ItemId,
                //        UnitId = item.Unitid,
                //        RowSeq = item.itemrowseq,
                //        Allowance = Allow,//item.Allowance,
                //        Quantity = totqty,//item.quantity,
                //        PlanType = item.Type,
                //        DivMul = (item.DivMul == "Multiply" ? "M" : "D"),
                //        AutoOrMan = (item.AutoOrMan == "1" ? "A" : item.AutoOrMan == "3" ? "S" : "M"),
                //        Prod_or_Ord = item.ProdOrOrd,
                //        Item_Remarks = item.ItemRemarks,
                //        Add_Date = item.AddDate,
                //        LockRow = item.LockRow,
                //        ShipRowID = 0,
                //        GenPlanType = "O",
                //        Amend = "P",
                //        CreatedBy = accreqmasobj.CreatedBy,
                //    });
                //}

                var result = TrimsDet.AddStyleTemplateData(Orderno, Entrydate, Styleid, BuyOrdMasid, ItemId, AccColorId, AccSizeId, Mode, PlanId, accreqmasobj);
                if (result)
                {
                    return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
                }
                else
                {
                    return new Response<int>(0, Status.ERROR, "Save Failed");
                }
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<AccessoryReqMas>> Getloadedit(int pid)
        {
            try
            {
                var Trimsedit = TrimsDet.Getloadedit(pid);

                return new Response<IQueryable<AccessoryReqMas>>(Trimsedit, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<AccessoryReqMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<TrimsItemDetails>> GetAccorPacDet(string OrderNo, int StyleId, int Itemid)
        {
            try
            {
                var Trimsedit = TrimsDet.GetAccorPackDet(OrderNo, StyleId, Itemid);

                return new Response<IQueryable<TrimsItemDetails>>(Trimsedit, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<TrimsItemDetails>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Response<IQueryable<TrimsColorDetails>> GetColor()
        {
            try
            {
                var TrimsDt = TrimsDet.GetColor();

                return new Response<IQueryable<TrimsColorDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<TrimsColorDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<TrimsColorDetails>> GetSize()
        {
            try
            {
                var TrimsDt = TrimsDet.GetSize();

                return new Response<IQueryable<TrimsColorDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<TrimsColorDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<TrimsColorDetails>> GetFabSize()
        {
            try
            {
                var TrimsDt = TrimsDet.GetFSize();

                return new Response<IQueryable<TrimsColorDetails>>(TrimsDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<TrimsColorDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        //Checking Budget Approval while deleting Trims
        public Response<bool> TrimsBOMAppChecking(string Orderno, int styleid, int itemid, int PlanTypeId, string ApplyType)
        {
            try
            {
                bool TrimsBOMappFlg = false;
                TrimsBOMappFlg = TrimsDet.BOMApprovalChecking(Orderno, styleid, itemid, PlanTypeId, ApplyType);
                if (TrimsBOMappFlg == false)
                {
                    return new Response<bool>(false, Status.ERROR, "Budget Approval not made...");
                }
                else
                {
                    return new Response<bool>(true, Status.SUCCESS, "Budget Approval made...");
                }
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteAccessories(int AccMasID, string orderno, int styleid, List<TrimsColorDetails> ComboColor, List<TrimsSizeDetails> ComboSize, List<TrimsStyleDetails> ComboStyle, int Mode, int PlanId, List<TrimsGenAuto> Genauto, List<TrimsGenAuto> GenManual, List<TrimsGenAuto> GenShip)
        {
            try
            {
                var TrimdDel = TrimsDet.DeleteAccess(AccMasID, orderno, styleid, ComboColor, ComboSize, ComboStyle, Mode, PlanId, Genauto, GenManual, GenShip);
                return new Response<bool>(true, Status.SUCCESS, "Deleted Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> UpdateAccessories(Domain.AccessoryReqMas accreq)
        {
            try
            {
                var accreqdet = new List<Repository.Acc_Req_Det>();

                var TrimsDt = TrimsDet.UpdateData(accreq);
                //foreach (var det in accreq.ComboColorList)
                //{
                //    accreqdet.Add(new Repository.Acc_Req_Det
                //    {
                //        AccReqMasID = det.AccReqMasID,
                //        AccReqDetID = det.AccReqDetID,
                //        TotalQty = det.TotalQty,
                //        BOMQty = det.BOMQty,
                //        PQty = det.PQty


                //    });
                //}

                //var res = TrimsDet.UpdateData(new Domain.AccessoryReqMas
                //{
                //        Allowance = accreq.Allowance,

                //        AccRedDet=accreq.AccRedDet

                //});
                ////foreach (var item in accreq)
                ////{
                ////    accreqmas.Add(new Repository.Acc_Req_Mas
                ////    {

                ////        Allowance = item.Allowance

                ////    });
                ////}

                ////List<Acc_Req_Det> accreqdet = new List<Acc_Req_Det>();


                return new Response<int>(1, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<AccessoryReqMas>> GetCheckItemDetails(string orderno, int StyleId, int Itemid, int CAItemId, int ApplyID, string AutoOrMan)
        {
            try
            {
                var ProductEWO = TrimsDet.GetDataBussCheckItemDetails(orderno, StyleId, Itemid, CAItemId, ApplyID, AutoOrMan);

                return new Response<IQueryable<AccessoryReqMas>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<AccessoryReqMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> Loadordtemp(string OrderNo, int StyleId, int Itemid, int Userid ,int Stytempid)
        {
            try
            {
                var result = TrimsDet.Loadordtemp(OrderNo, StyleId, Itemid, Userid,Stytempid);
                if (result)
                {
                    return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
                }
                else
                {
                    return new Response<int>(0, Status.ERROR, "Save Failed");
                }
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<AccessoryReqMas>> GetDataCheckPlanTrimTempDetails(string orderno, int StyleId, int Itemid, int CAItemId)
        {
            try
            {
                var ProductEWO = TrimsDet.GetDataRepCheckPlanTrimTempDetails(orderno, StyleId, Itemid, CAItemId);

                return new Response<IQueryable<AccessoryReqMas>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<AccessoryReqMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
