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
    public class StoresDeliveryBusiness : IStoreDeliveryBusiness
    {

        IStoresDeliveryRepository DLRep = new StoresDeliveryRepository();

        public Response<IList<StoresDelivery>> ListAddDetails(int? Companyid, int? Buyerid, string OrderNo, string RefNo, int? FromStoreUnitID, int? Companyunitid, string Job_Mac_Gen, string ItemType, string unit_or_other, string IgroupId)
        {
            try
            {
                var ProductWO = DLRep.GetDataAddDelRepDetails(Companyid, Buyerid, OrderNo, RefNo, FromStoreUnitID, Companyunitid, Job_Mac_Gen, ItemType, unit_or_other, IgroupId);

                return new Response<IList<StoresDelivery>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<StoresDelivery>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StoresDeliveryDet>> ListDelyItemDetails(string JMasId, string Job_Mac_Gen, string ItemType ,string ItemGroup,int Storeid,int Processid)
        {
            try
            {
                var CurRGList = DLRep.GetRepDelyItemLoad(JMasId, Job_Mac_Gen, ItemType, ItemGroup, Storeid, Processid);

                return new Response<IList<StoresDeliveryDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StoresDeliveryDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StoresDeliveryOrder>> ListDelyOrderDetails(string JMasId, string Job_Mac_Gen, string ItemType, int OItemid, int OColorid, int OSizeid, int OUomid, int ESNo,int Processid)
        {
            try
            {
                var CurRGList = DLRep.GetRepDelyOrderLoad(JMasId, Job_Mac_Gen, ItemType, OItemid, OColorid, OSizeid, OUomid, ESNo,Processid);

                return new Response<IList<StoresDeliveryOrder>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StoresDeliveryOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StoresDeliveryStock>> ListDelyStockDetails(string JMasId, string Job_Mac_Gen, string ItemType, int Companyid, int FromStoreUnitID, string Joborderno, int OItemid, int OColorid, int OSizeid, int OUomid,int ONo,int Processid)
        {
            try
            {
                var STRGList = DLRep.GetRepDelyStockLoad(JMasId, Job_Mac_Gen, ItemType, Companyid, FromStoreUnitID, Joborderno, OItemid, OColorid, OSizeid, OUomid, ONo,Processid);

                return new Response<IList<StoresDeliveryStock>>(STRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StoresDeliveryStock>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateDelEntry(StoresDelivery PODEntry)
        {
            int? desunitid = 0;
            int? RequestnerId = 0;
            int? FromStoreUnitID = 0;
            int? CreatedBy = 0;
            int? Deptid = 0;
            if (PODEntry.desunitid == 0)
            {
                desunitid = null;
            }
            else
            {
                desunitid = PODEntry.desunitid;
            }

            if (PODEntry.RequestnerId == 0)
            {
                RequestnerId = null;
            }
            else
            {
                RequestnerId = PODEntry.RequestnerId;
            }
            if (PODEntry.FromStoreUnitID == 0)
            {
                FromStoreUnitID = null;
            }
            else
            {
                FromStoreUnitID = PODEntry.FromStoreUnitID;
            }
            if (PODEntry.CreatedBy == 0)
            {
                CreatedBy = null;
            }
            else
            {
                CreatedBy = PODEntry.CreatedBy;
            }
            if (PODEntry.Deptid == 0)
            {
                Deptid = null;
            }
            else
            {
                Deptid = PODEntry.Deptid;
            }

            try
            {



                AxonApparel.Repository.Stores_Issue_Mas StoresDelInsert = new AxonApparel.Repository.Stores_Issue_Mas
                {

                    Issueno = PODEntry.Issueno,
                    Issuedate = PODEntry.Issuedate,
                    Companyunitid = PODEntry.Companyunitid,
                    Companyid = PODEntry.Companyid,
                    Unit_supplier_self = PODEntry.Unit_supplier_self,
                    desunitid = desunitid,
                    remarks = PODEntry.remarks,
                    Job_Mac_Gen = PODEntry.Job_Mac_Gen,
                    issue_Commit = PODEntry.issue_Commit,
                    reqorstock = PODEntry.reqorstock,
                    issueunit = PODEntry.issueunit,
                    unit_or_other = PODEntry.unit_or_other,
                    ItemType = PODEntry.ItemType,
                    GatePassVehicle = PODEntry.GatePassVehicle,
                    QualityMade = PODEntry.QualityMade,
                    QltyRemarks = PODEntry.QltyRemarks,
                    RequestnerId = RequestnerId,
                    FromStoreUnitID = FromStoreUnitID,
                    CreatedBy = CreatedBy,
                    Deptid = Deptid,
                    SplNo = PODEntry.SplNo,
                    Processid = PODEntry.Processid,

                };

                var ItmList = new List<Stores_Issue_Det>();

                foreach (var PItem in PODEntry.StoresDelDet)
                {


                    if (PItem.Quantity > 0)
                    {
                        ItmList.Add(new Stores_Issue_Det
                        {
                            IssueDetId = PItem.IssueDetId,
                            IssueId = PItem.IssueId,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Quantity = PItem.Quantity,
                            returnqty = PItem.returnqty,
                            uomid = PItem.Uomid,
                            Sec_Qty = PItem.Sec_Qty,
                            UnitStockid = PItem.UnitStockid,
                            ItemRemarks = PItem.ItemRemarks,
                            qtyremarks = PItem.qtyremarks,
                            Sec_uomid = PItem.Sec_uomid,
                            RefConversion = PItem.RefConversion,
                            Sec_qty1 = PItem.Quantity,
                            Sec_uomid1 = PItem.Sec_uomid1,
                            QltyItemRemarks = "",
                            ReceivedQty = 0,
                            RejectedQty = 0,
                            RejectStockId = PItem.RejectStockId,
                            ExcessQty = PItem.ExcessQty,
                            PlannedSizeID=PItem.Plansizeid

                        });
                    }
                }



                var OrderList = new List<Stores_Issue_Order>();

                if (PODEntry.StoresDelOrd != null)
                {

                    foreach (var OItem in PODEntry.StoresDelOrd)
                    {

                        if (PODEntry.Job_Mac_Gen == "W")
                        {



                            if (OItem.IssueQty > 0)
                            {
                                OrderList.Add(new Stores_Issue_Order
                                {

                                    IssueID = OItem.IssueID,
                                    IssueOrdID = OItem.IssueOrdID,
                                    IssueDetID = OItem.IssueDetID,
                                    OrderNo = OItem.WorkOrd,
                                    IssueQty = OItem.IssueQty,
                                    UnitStockId = OItem.UnitStockId,
                                    ReceivedQty = 0,
                                    RejectedQty = 0,
                                    RejectStockId = OItem.RejectStockId,
                                    ReturnQty = 0,
                                    ExcessQty = OItem.ExcessQty,
                                    ItemID = OItem.OItemid,
                                    ColorID = OItem.OColorid,
                                    SizeID = OItem.OSizeid,
                                    UOMId = OItem.OUomid,
                                    PlannedSizeID=OItem.Plansizeid,
                                    jmasid = OItem.JoMasId

                                });
                            }
                        }
                        if (PODEntry.Job_Mac_Gen == "S")
                        {



                            if (OItem.IssueQty > 0)
                            {
                                OrderList.Add(new Stores_Issue_Order
                                {

                                    IssueID = OItem.IssueID,
                                    IssueOrdID = OItem.IssueOrdID,
                                    IssueDetID = OItem.IssueDetID,
                                    OrderNo = OItem.WorkOrd,
                                    IssueQty = OItem.IssueQty,
                                    UnitStockId = OItem.UnitStockId,
                                    ReceivedQty = 0,
                                    RejectedQty = 0,
                                    RejectStockId = OItem.RejectStockId,
                                    ReturnQty = 0,
                                    ExcessQty = OItem.ExcessQty,
                                    ItemID = OItem.OItemid,
                                    ColorID = OItem.OColorid,
                                    SizeID = OItem.OSizeid,
                                    UOMId = OItem.OUomid,
                                    PlannedSizeID = OItem.Plansizeid,
                                     jmasid = OItem.JoMasId
                                });
                            }
                        }
                        else if (PODEntry.Job_Mac_Gen == "P")
                        {



                            if (OItem.IssueQty > 0)
                            {
                                OrderList.Add(new Stores_Issue_Order
                                {

                                    IssueID = OItem.IssueID,
                                    IssueOrdID = OItem.IssueOrdID,
                                    IssueDetID = OItem.IssueDetID,
                                    OrderNo = OItem.WorkOrd,
                                    IssueQty = OItem.IssueQty,
                                    UnitStockId = OItem.UnitStockId,
                                    ReceivedQty = 0,
                                    RejectedQty = 0,
                                    RejectStockId = OItem.RejectStockId,
                                    ReturnQty = 0,
                                    ExcessQty = OItem.ExcessQty,
                                    ItemID = OItem.OItemid,
                                    ColorID = OItem.OColorid,
                                    SizeID = OItem.OSizeid,
                                    UOMId = OItem.OUomid,
                                    PlannedSizeID = OItem.Plansizeid,
                                     jmasid = OItem.JoMasId
                                });
                            }
                        }
                        else if (PODEntry.Job_Mac_Gen == "R")
                        {
                            if (OItem.IssueQty > 0)
                            {
                                OrderList.Add(new Stores_Issue_Order
                                {

                                    IssueID = OItem.IssueID,
                                    IssueOrdID = OItem.IssueOrdID,
                                    IssueDetID = OItem.IssueDetID,
                                    OrderNo = OItem.OrderNo,
                                    IssueQty = OItem.IssueQty,
                                    UnitStockId = OItem.UnitStockId,
                                    ReceivedQty = 0,
                                    RejectedQty = 0,
                                    RejectStockId = OItem.RejectStockId,
                                    ReturnQty = 0,
                                    ExcessQty = OItem.ExcessQty,
                                    ItemID = OItem.OItemid,
                                    ColorID = OItem.OColorid,
                                    SizeID = OItem.OSizeid,
                                    UOMId = OItem.OUomid,
                                    PlannedSizeID = OItem.Plansizeid,
                                     jmasid = OItem.JoMasId
                                });
                            }
                        }
                    }
                }

                //stock
                var StockList = new List<Stores_Issue_Stock>();

                foreach (var SItem in PODEntry.StoresDelStock)
                {
                    

                    if (SItem.quantity > 0)
                    {
                        StockList.Add(new Stores_Issue_Stock
                        {

                            IssueStockID = SItem.IssueStockID,
                            IssueDetId = SItem.IssueDetId,
                            ItemStockId = SItem.ItemStockId,
                            quantity = SItem.quantity,
                            Sec_qty = SItem.Sec_qty,
                            IssueOrdId = SItem.IssueOrdId,
                            ItemID=SItem.SItemid,
                            ColorID=SItem.SColorid,
                            SizeID=SItem.SSizeid,
                            UOMId=SItem.SUomid,
                            jmasid=SItem.jmasid

                        });
                    }
                }

                var result = DLRep.AddDetData(StoresDelInsert,ItmList, OrderList, StockList, PODEntry.Issueno, PODEntry.Issuedate, PODEntry.Job_Mac_Gen);

                
                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDelivery>> GetDataUnitDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid)
        {
            try
            {
                var PWO = DLRep.GetDataUnitRepDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid);

                return new Response<IQueryable<StoresDelivery>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDelivery>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDelivery>> GetDataOrderDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {
            try
            {
                var PWO = DLRep.GetDataOrderRepDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid, OrderNo, RefNo, desunitid, IssueId);

                return new Response<IQueryable<StoresDelivery>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDelivery>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDelivery>> GetDataIssueDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {
            try
            {
                var PWO = DLRep.GetDataIssueRepDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid, OrderNo, RefNo, desunitid, IssueId);

                return new Response<IQueryable<StoresDelivery>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDelivery>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<StoresDelivery>> GetDataDisDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {
            try
            {
                var PWO = DLRep.GetDataDisRepDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid, OrderNo, RefNo, desunitid, IssueId);

                return new Response<IQueryable<StoresDelivery>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDelivery>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDelivery>> GetDataDelyMainDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {
            try
            {
                var PWO = DLRep.GetDataMainRepDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid, OrderNo, RefNo, desunitid, IssueId);

                return new Response<IQueryable<StoresDelivery>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDelivery>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDelivery>> GetDeliEditDetails(int Id)
        {
            try
            {
                var ProdutWO = DLRep.GetDataRepEditDeliDetails(Id);

                return new Response<IQueryable<StoresDelivery>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDelivery>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<StoresDelivery>> LoadMainOrderdet(int IssId)
        {
            try
            {
                var ProdutWO = DLRep.LoadMainOrderdet(IssId);

                return new Response<IQueryable<StoresDelivery>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDelivery>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<StoresDeliveryDet>> GetEditDetDetails(int Id, string Job_Mac_Gen)
        {
            try
            {
                var CRGList = DLRep.GetRepEntryDelyEditItemLoad(Id, Job_Mac_Gen);

                return new Response<IList<StoresDeliveryDet>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StoresDeliveryDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StoresDeliveryOrder>> GetEditOrdDetails(int IssueId, int OItemid, int OColorid, int OSizeid, int OUomid, string Job_Mac_Gen)
        {
            try
            {
                var CRGList = DLRep.GetRepEntryDelyEditOrdLoad(IssueId, OItemid, OColorid, OSizeid, OUomid, Job_Mac_Gen);

                return new Response<IList<StoresDeliveryOrder>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StoresDeliveryOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StoresDeliveryStock>> GetEditStkDetails(int? IssueId, int? OItemid, int? OColorid, int? OSizeid, int? OUomid, string Job_Mac_Gen, int? Companyid, int? FromStoreUnitID)
        {
            try
            {
                var CRGList = DLRep.GetRepEntryDelyEditStkLoad(IssueId, OItemid, OColorid, OSizeid, OUomid, Job_Mac_Gen, Companyid, FromStoreUnitID);

                return new Response<IList<StoresDeliveryStock>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<StoresDeliveryStock>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateDelEntry(StoresDelivery DelEEntry)
        {
            int? desunitid = 0;
            int? RequestnerId = 0;
            int? FromStoreUnitID = 0;
            int? CreatedBy = 0;
            int? Deptid = 0;
            if (DelEEntry.desunitid == 0)
            {
                desunitid = null;
            }
            else
            {
                desunitid = DelEEntry.desunitid;
            }

            if (DelEEntry.RequestnerId == 0)
            {
                RequestnerId = null;
            }
            else
            {
                RequestnerId = DelEEntry.RequestnerId;
            }
            if (DelEEntry.FromStoreUnitID == 0)
            {
                FromStoreUnitID = null;
            }
            else
            {
                FromStoreUnitID = DelEEntry.FromStoreUnitID;
            }
            if (DelEEntry.CreatedBy == 0)
            {
                CreatedBy = null;
            }
            else
            {
                CreatedBy = DelEEntry.CreatedBy;
            }
            if (DelEEntry.Deptid == 0)
            {
                Deptid = null;
            }
            else
            {
                Deptid = DelEEntry.Deptid;
            }

            try
            {

                

                AxonApparel.Repository.Stores_Issue_Mas StoresDelEdit = new AxonApparel.Repository.Stores_Issue_Mas
                {

                    Issueno = DelEEntry.Issueno,
                    Issuedate = DelEEntry.Issuedate,
                    Companyunitid = DelEEntry.Companyunitid,
                    Companyid = DelEEntry.Companyid,
                    Unit_supplier_self = DelEEntry.Unit_supplier_self,
                    desunitid = desunitid,
                    remarks = DelEEntry.remarks,
                    Job_Mac_Gen = DelEEntry.Job_Mac_Gen,
                    issue_Commit = DelEEntry.issue_Commit,
                    reqorstock = DelEEntry.reqorstock,
                    issueunit = DelEEntry.issueunit,
                    unit_or_other = DelEEntry.unit_or_other,
                    ItemType = DelEEntry.ItemType,
                    GatePassVehicle = DelEEntry.GatePassVehicle,
                    QualityMade = DelEEntry.QualityMade,
                    QltyRemarks = DelEEntry.QltyRemarks,
                    RequestnerId = RequestnerId,
                    FromStoreUnitID = FromStoreUnitID,
                    CreatedBy = CreatedBy,
                    Deptid = Deptid,
                    SplNo = DelEEntry.SplNo,
                    IssueId = DelEEntry.IssueId,
                    Processid = DelEEntry.Processid,
                };

                var ItmList = new List<Stores_Issue_Det>();

                foreach (var PItem in DelEEntry.StoresDelDet)
                {


                    if (PItem.Quantity > 0)
                    {
                        ItmList.Add(new Stores_Issue_Det
                        {
                            IssueDetId = PItem.IssueDetId,
                            IssueId = PItem.IssueId,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Quantity = PItem.Quantity,
                            returnqty = PItem.returnqty,
                            uomid = PItem.Uomid,
                            Sec_Qty = PItem.Sec_Qty,
                            UnitStockid = PItem.UnitStockid,
                            ItemRemarks = PItem.ItemRemarks,
                            qtyremarks = PItem.qtyremarks,
                            Sec_uomid = PItem.Sec_uomid,
                            RefConversion = PItem.RefConversion,
                            Sec_qty1 = PItem.Quantity,
                            Sec_uomid1 = PItem.Sec_uomid1,
                            QltyItemRemarks = "",
                            ReceivedQty = 0,
                            RejectedQty = 0,
                            RejectStockId = PItem.RejectStockId,
                            ExcessQty = PItem.ExcessQty,
                            PlannedSizeID=PItem.Plansizeid

                        });
                    }
                }



                var OrderList = new List<Stores_Issue_Order>();

                if (DelEEntry.StoresDelOrd != null)
                {


                    foreach (var OItem in DelEEntry.StoresDelOrd)
                    {
                        if (DelEEntry.Job_Mac_Gen == "W")
                        {

                            if (OItem.IssueQty > 0)
                            {
                                OrderList.Add(new Stores_Issue_Order
                                {

                                    IssueID = OItem.IssueID,
                                    IssueOrdID = OItem.IssueOrdID,
                                    IssueDetID = OItem.IssueDetID,
                                    OrderNo = OItem.WorkOrd,
                                    IssueQty = OItem.IssueQty,
                                    UnitStockId = OItem.UnitStockId,
                                    ReceivedQty = 0,
                                    RejectedQty = 0,
                                    RejectStockId = OItem.RejectStockId,
                                    ReturnQty = 0,
                                    ExcessQty = OItem.ExcessQty,
                                    ItemID = OItem.OItemid,
                                    ColorID = OItem.OColorid,
                                    SizeID = OItem.OSizeid,
                                    UOMId = OItem.OUomid,
                                    PlannedSizeID=OItem.Plansizeid

                                });
                            }
                        }
                        if (DelEEntry.Job_Mac_Gen == "S")
                        {

                            if (OItem.IssueQty > 0)
                            {
                                OrderList.Add(new Stores_Issue_Order
                                {

                                    IssueID = OItem.IssueID,
                                    IssueOrdID = OItem.IssueOrdID,
                                    IssueDetID = OItem.IssueDetID,
                                    OrderNo = OItem.WorkOrd,
                                    IssueQty = OItem.IssueQty,
                                    UnitStockId = OItem.UnitStockId,
                                    ReceivedQty = 0,
                                    RejectedQty = 0,
                                    RejectStockId = OItem.RejectStockId,
                                    ReturnQty = 0,
                                    ExcessQty = OItem.ExcessQty,
                                    ItemID = OItem.OItemid,
                                    ColorID = OItem.OColorid,
                                    SizeID = OItem.OSizeid,
                                    UOMId = OItem.OUomid,
                                    PlannedSizeID = OItem.Plansizeid

                                });
                            }
                        }
                        if (DelEEntry.Job_Mac_Gen == "P")
                        {

                            if (OItem.IssueQty > 0)
                            {
                                OrderList.Add(new Stores_Issue_Order
                                {

                                    IssueID = OItem.IssueID,
                                    IssueOrdID = OItem.IssueOrdID,
                                    IssueDetID = OItem.IssueDetID,
                                    OrderNo = OItem.WorkOrd,
                                    IssueQty = OItem.IssueQty,
                                    UnitStockId = OItem.UnitStockId,
                                    ReceivedQty = 0,
                                    RejectedQty = 0,
                                    RejectStockId = OItem.RejectStockId,
                                    ReturnQty = 0,
                                    ExcessQty = OItem.ExcessQty,
                                    ItemID = OItem.OItemid,
                                    ColorID = OItem.OColorid,
                                    SizeID = OItem.OSizeid,
                                    UOMId = OItem.OUomid,
                                    PlannedSizeID = OItem.Plansizeid

                                });
                            }
                        }
                        if (DelEEntry.Job_Mac_Gen == "R")
                        {

                            if (OItem.IssueQty > 0)
                            {
                                OrderList.Add(new Stores_Issue_Order
                                {

                                    IssueID = OItem.IssueID,
                                    IssueOrdID = OItem.IssueOrdID,
                                    IssueDetID = OItem.IssueDetID,
                                    OrderNo = OItem.OrderNo,
                                    IssueQty = OItem.IssueQty,
                                    UnitStockId = OItem.UnitStockId,
                                    ReceivedQty = 0,
                                    RejectedQty = 0,
                                    RejectStockId = OItem.RejectStockId,
                                    ReturnQty = 0,
                                    ExcessQty = OItem.ExcessQty,
                                    ItemID = OItem.OItemid,
                                    ColorID = OItem.OColorid,
                                    SizeID = OItem.OSizeid,
                                    UOMId = OItem.OUomid,
                                    PlannedSizeID = OItem.Plansizeid

                                });
                            }
                        }
                    }
                }

                //stock
                var StockList = new List<Stores_Issue_Stock>();

                foreach (var SItem in DelEEntry.StoresDelStock)
                {


                    if (SItem.quantity > 0)
                    {
                        StockList.Add(new Stores_Issue_Stock
                        {

                            IssueStockID = SItem.IssueStockID,
                            IssueDetId = SItem.IssueDetId,
                            ItemStockId = SItem.ItemStockId,
                            quantity = SItem.quantity,
                            Sec_qty = SItem.Sec_qty,
                            IssueOrdId = SItem.IssueOrdId,


                        });
                    }
                }

                var result = DLRep.UpdateDetData(StoresDelEdit,ItmList, OrderList, StockList, DelEEntry.Issueno, DelEEntry.Issuedate, DelEEntry.Job_Mac_Gen);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteDelEntry(StoresDelivery DelDEntry)
        {
            try
            {
           
                var OrderList = new List<Stores_Issue_Order>();
                if (DelDEntry.StoresDelOrd != null)
                {

                    foreach (var OItem in DelDEntry.StoresDelOrd)
                    {


                        if (OItem.IssueQty > 0)
                        {


                            if (DelDEntry.Job_Mac_Gen == "W")
                            {

                                if (OItem.IssueQty > 0)
                                {
                                    OrderList.Add(new Stores_Issue_Order
                                    {

                                        IssueID = OItem.IssueID,
                                        IssueOrdID = OItem.IssueOrdID,
                                        IssueDetID = OItem.IssueDetID,
                                        OrderNo = OItem.WorkOrd,
                                        IssueQty = OItem.IssueQty,
                                        UnitStockId = OItem.UnitStockId,
                                        ReceivedQty = 0,
                                        RejectedQty = 0,
                                        RejectStockId = OItem.RejectStockId,
                                        ReturnQty = 0,
                                        ExcessQty = OItem.ExcessQty,
                                        ItemID = OItem.OItemid,
                                        ColorID = OItem.OColorid,
                                        SizeID = OItem.OSizeid,
                                        UOMId = OItem.OUomid,
                                        PlannedSizeID = OItem.Plansizeid

                                    });
                                }
                            }
                            if (DelDEntry.Job_Mac_Gen == "S")
                            {

                                if (OItem.IssueQty > 0)
                                {
                                    OrderList.Add(new Stores_Issue_Order
                                    {

                                        IssueID = OItem.IssueID,
                                        IssueOrdID = OItem.IssueOrdID,
                                        IssueDetID = OItem.IssueDetID,
                                        OrderNo = OItem.WorkOrd,
                                        IssueQty = OItem.IssueQty,
                                        UnitStockId = OItem.UnitStockId,
                                        ReceivedQty = 0,
                                        RejectedQty = 0,
                                        RejectStockId = OItem.RejectStockId,
                                        ReturnQty = 0,
                                        ExcessQty = OItem.ExcessQty,
                                        ItemID = OItem.OItemid,
                                        ColorID = OItem.OColorid,
                                        SizeID = OItem.OSizeid,
                                        UOMId = OItem.OUomid,
                                        PlannedSizeID = OItem.Plansizeid

                                    });
                                }
                            }
                            if (DelDEntry.Job_Mac_Gen == "P")
                            {

                                if (OItem.IssueQty > 0)
                                {
                                    OrderList.Add(new Stores_Issue_Order
                                    {

                                        IssueID = OItem.IssueID,
                                        IssueOrdID = OItem.IssueOrdID,
                                        IssueDetID = OItem.IssueDetID,
                                        OrderNo = OItem.WorkOrd,
                                        IssueQty = OItem.IssueQty,
                                        UnitStockId = OItem.UnitStockId,
                                        ReceivedQty = 0,
                                        RejectedQty = 0,
                                        RejectStockId = OItem.RejectStockId,
                                        ReturnQty = 0,
                                        ExcessQty = OItem.ExcessQty,
                                        ItemID = OItem.OItemid,
                                        ColorID = OItem.OColorid,
                                        SizeID = OItem.OSizeid,
                                        UOMId = OItem.OUomid,
                                        PlannedSizeID = OItem.Plansizeid

                                    });
                                }
                            }
                            if (DelDEntry.Job_Mac_Gen == "R")
                            {

                                if (OItem.IssueQty > 0)
                                {
                                    OrderList.Add(new Stores_Issue_Order
                                    {

                                        IssueID = OItem.IssueID,
                                        IssueOrdID = OItem.IssueOrdID,
                                        IssueDetID = OItem.IssueDetID,
                                        OrderNo = OItem.OrderNo,
                                        IssueQty = OItem.IssueQty,
                                        UnitStockId = OItem.UnitStockId,
                                        ReceivedQty = 0,
                                        RejectedQty = 0,
                                        RejectStockId = OItem.RejectStockId,
                                        ReturnQty = 0,
                                        ExcessQty = OItem.ExcessQty,
                                        ItemID = OItem.OItemid,
                                        ColorID = OItem.OColorid,
                                        SizeID = OItem.OSizeid,
                                        UOMId = OItem.OUomid,
                                        PlannedSizeID = OItem.Plansizeid

                                    });
                                }
                            }


                            //OrderList.Add(new Stores_Issue_Order
                            //{

                            //    IssueID = OItem.IssueID,
                            //    IssueOrdID = OItem.IssueOrdID,
                            //    IssueDetID = OItem.IssueDetID,
                            //    OrderNo = OItem.WorkOrd,
                            //    IssueQty = OItem.IssueQty,
                            //    UnitStockId = OItem.UnitStockId,
                            //    ReceivedQty = 0,
                            //    RejectedQty = 0,
                            //    RejectStockId = OItem.RejectStockId,
                            //    ReturnQty = 0,
                            //    ExcessQty = OItem.ExcessQty,
                            //    ItemID = OItem.OItemid,
                            //    ColorID = OItem.OColorid,
                            //    SizeID = OItem.OSizeid,
                            //    UOMId = OItem.OUomid,
                            //    PlannedSizeID=OItem.Plansizeid

                            //});


                        }
                    }
                }
                //stock
                var StockList = new List<Stores_Issue_Stock>();

                foreach (var SItem in DelDEntry.StoresDelStock)
                {


                    if (SItem.quantity > 0)
                    {
                        StockList.Add(new Stores_Issue_Stock
                        {

                            IssueStockID = SItem.IssueStockID,
                            IssueDetId = SItem.IssueDetId,
                            ItemStockId = SItem.ItemStockId,
                            quantity = SItem.quantity,
                            Sec_qty = SItem.Sec_qty,
                            IssueOrdId = SItem.IssueOrdId,
                            

                        });
                    }
                }

                var result = DLRep.DeleteDetData(OrderList, StockList, DelDEntry.Issueno, DelDEntry.Issuedate, DelDEntry.Job_Mac_Gen);

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
