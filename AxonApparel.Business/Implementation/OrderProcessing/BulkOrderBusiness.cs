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
    public class BulkOrderBusiness : IBulkOrderBusiness
    {
        IBulkOrderRepository bulkordRep = new BulkOrderRepository();
        private ISampleTypeRepository strrep = new SampleTypeRepository();

        public Response<IEnumerable<BulkOrder>> GetBulkOrder()
        {
            try
            {
                var bulList = bulkordRep.GetDataListAll();
                return new Response<IEnumerable<Domain.BulkOrder>>(bulList.Select(m => new Domain.BulkOrder
                {
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    Order_No = m.Order_No,
                    Order_Date = (DateTime)m.Order_Date,
                    BuyerId = (int)m.BuyerId,
                    Buyer_AddId = (int)m.Buyer_AddId,
                    ManagerId = (int)m.ManagerId,
                    MerchandiserId = (int)m.MerchandiserId,
                    Ref_No = m.Ref_No,
                    Ref_Date = (DateTime)m.Ref_Date,
                    Pay_SystemId = (int)m.Pay_SystemId,
                    SystemId = (int)m.SystemId,
                    Payment_ModeId = (int)m.Payment_ModeId,
                    AgentId = (int)m.AgentId,
                    Agent_AddId = (int)m.Agent_AddId,
                    ShipAgentId = (int)m.ShipAgentId,
                    ShipAgent_AddId = (int)m.ShipAgent_AddId,
                    CurrencyId = (int)m.CurrencyId,
                    Exchange = (int)m.Exchange,
                    Cancel = m.Cancel ? "TRUE" : "FALSE",
                    Comit = m.Comit ? "TRUE" : "FALSE",
                    CompanyId = (int)m.CompanyId,
                    Closed = m.Closed,
                    CloseDate = (DateTime)m.CloseDate,
                    Quantity = (int)m.Quantity,
                    Cost_def = m.Cost_def,
                    GuomId = (int)m.GuomId,
                    Guom_Conv = (Int16)m.Guom_Conv,
                    Agency_Per = (Int16)m.Agency_Per,
                    Bas_Unit = (int)m.Bas_Unit,
                    Remarks = m.Remarks,
                    ClaimType = m.ClaimType,
                    NominatedForwarder = m.NominatedForwarder,
                    CSP = m.CSP,
                    Buyer_Ref_No = m.Buyer_Ref_No,
                    TransAmend = m.TransAmend,
                    ConsigneeId = (int)m.ConsigneeId,
                    CreatedBy = (int)m.CreatedBy,
                    OrdType = m.OrdType,
                    Consignee_AddId = (int)m.Consignee_AddId,
                    RevQuoteId = (int)(m.RevQuoteId == null ? 0 : m.RevQuoteId),// (int)m.RevQuoteId,
                    RevQuoteNo = (m.RevQuoteNo == null ? "" : m.RevQuoteNo),// m.RevQuoteNo,
                    Rev = (m.Rev == null ? "" : m.Rev)

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<BulkOrder>> GetSampleOrderRefNo()
        {
            try
            {
                var OrdList = bulkordRep.GetDataListAll();
                return new Response<IEnumerable<Domain.BulkOrder>>(OrdList.Select(m => new Domain.BulkOrder
                {
                    Ref_No = m.Ref_No,
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    OrdType = m.OrdType,
                }).Where(q => q.OrdType == "S"), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<BulkOrder>> GetBulkOrderTest(string RefNo)
        {
            try
            {
                //var bulList = bulkordRep.GetDataListTest(BulOrd);

                var bList = bulkordRep.GetDataListTest(RefNo);
                return new Response<IEnumerable<Domain.BulkOrder>>(bList.Select(m => new Domain.BulkOrder
                {
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    Order_No = m.Order_No,
                    Order_Date = (DateTime)m.Order_Date,
                    BuyerId = (int)m.BuyerId,
                    Buyer_AddId = (int)m.Buyer_AddId,
                    ManagerId = (int)m.ManagerId,
                    MerchandiserId = (int)m.MerchandiserId,
                    Ref_No = m.Ref_No,
                    Ref_Date = (DateTime)m.Ref_Date,
                    Pay_SystemId = (int)m.Pay_SystemId,
                    SystemId = (int)m.SystemId,
                    Payment_ModeId = (int)m.Payment_ModeId,
                    AgentId = (int)m.AgentId,
                    Agent_AddId = (int)m.Agent_AddId,
                    ShipAgentId = (int)m.ShipAgentId,
                    ShipAgent_AddId = (int)m.ShipAgent_AddId,
                    CurrencyId = (int)m.CurrencyId,
                    Exchange = (int)m.Exchange,
                    Cancel = m.Cancel ? "TRUE" : "FALSE",
                    Comit = m.Comit ? "TRUE" : "FALSE",
                    CompanyId = (int)m.CompanyId,
                    Closed = m.Closed,
                    CloseDate = (DateTime)m.CloseDate,
                    Quantity = (int)m.Quantity,
                    Cost_def = m.Cost_def,
                    GuomId = (int)m.GuomId,
                    Guom_Conv = (Int16)m.Guom_Conv,
                    Agency_Per = (Int16)m.Agency_Per,
                    Bas_Unit = (int)m.Bas_Unit,
                    Remarks = m.Remarks,
                    ClaimType = m.ClaimType,
                    NominatedForwarder = m.NominatedForwarder,
                    CSP = m.CSP,
                    Buyer_Ref_No = m.Buyer_Ref_No,
                    TransAmend = m.TransAmend,
                    ConsigneeId = (int)m.ConsigneeId,
                    CreatedBy = (int)m.CreatedBy,
                    OrdType = m.OrdType,
                    Consignee_AddId = (int)m.Consignee_AddId,
                    RevQuoteId = (int)(m.RevQuoteId == null ? 0 : m.RevQuoteId),// (int)m.RevQuoteId,
                    RevQuoteNo = (m.RevQuoteNo == null ? "" : m.RevQuoteNo),// m.RevQuoteNo,
                    Rev = (m.Rev == null ? "" : m.Rev)
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<BulkOrder> GetDataById(int Buy_Ord_MasId) 
        {
            try
            {
                var buo = bulkordRep.GetDataById(Buy_Ord_MasId);

                int? AgnID = 0;

                if (buo.AgentId == null)
                {
                    AgnID = 0;
                }
                else
                {
                    AgnID = buo.AgentId;
                }


                int? CurrID = 0;

                if (buo.CurrencyId == null)
                {
                    CurrID = 0;
                }
                else
                {
                    CurrID = buo.CurrencyId;
                }


                int? BuyID = 0;

                if (buo.BuyerId == null)
                {
                    BuyID = 0;
                }
                else
                {
                    BuyID = buo.BuyerId;
                }


                int? PaySysID = 0;

                if (buo.Pay_SystemId == null)
                {
                    PaySysID = 0;
                }
                else
                {
                    PaySysID = buo.Pay_SystemId;
                }


                int? SysID = 0;

                if (buo.SystemId == null)
                {
                    SysID = 0;
                }
                else
                {
                    SysID = buo.SystemId;
                }


                int? PayModID = 0;

                if (buo.Payment_ModeId == null)
                {
                    PayModID = 0;
                }
                else
                {
                    PayModID = buo.Payment_ModeId;
                }
                int? ParId = 0;

                if (buo.ParentOrderId == null)
                {
                    ParId = 0;
                }
                else
                {
                    ParId = buo.ParentOrderId;
                }
                return new Response<Domain.BulkOrder>(new Domain.BulkOrder
                {

                    Buy_Ord_MasId = buo.Buy_Ord_MasId,
                    Order_No = buo.Order_No,
                    Order_Date = (DateTime)buo.Order_Date,
                    BuyerId = (int)BuyID,
                    Buyer_AddId = (int)BuyID,//(int)buo.Buyer_AddId,
                    ManagerId = (int)buo.ManagerId,
                    MerchandiserId = (int)buo.MerchandiserId,
                    Ref_No = buo.Ref_No,
                    Ref_Date = (DateTime)buo.Ref_Date,
                    Pay_SystemId = (int)PaySysID,//(int)buo.Pay_SystemId,
                    SystemId = (int)SysID,//(int)buo.SystemId,
                    Payment_ModeId = (int)PayModID,//(int)buo.Payment_ModeId,
                    AgentId = (int)AgnID,
                    Agent_AddId = (int)AgnID,
                    ShipAgentId = (int)buo.ShipAgentId,
                    ShipAgent_AddId = (int)buo.ShipAgent_AddId,
                    CurrencyId = (int)CurrID,
                    Exchange = (int)buo.Exchange,
                    Cancel = buo.Cancel ? "TRUE" : "FALSE",
                    Comit = buo.Comit ? "TRUE" : "FALSE",
                    CompanyId = (int)buo.CompanyId,
                    Closed = buo.Closed,
                    CloseDate = (DateTime)buo.CloseDate,
                    Quantity = (int)buo.Quantity,
                    Cost_def = buo.Cost_def,
                    GuomId = (int)buo.GuomId,
                    Guom_Conv = (Int16)buo.Guom_Conv,
                    Agency_Per = (Int16)buo.Agency_Per,
                    Bas_Unit = (int)buo.Bas_Unit,
                    Remarks = buo.Remarks,
                    ClaimType = buo.ClaimType,
                    NominatedForwarder = buo.NominatedForwarder,
                    CSP = buo.CSP,
                    Buyer_Ref_No = buo.Buyer_Ref_No,
                    TransAmend = buo.TransAmend,
                    ConsigneeId = (int)buo.ConsigneeId,
                    CreatedBy = (int)buo.CreatedBy,
                    OrdType = buo.OrdType,
                    RevQuoteId = (int)(buo.RevQuoteId == null ? 0 : buo.RevQuoteId),// (int)m.RevQuoteId,
                    RevQuoteNo = (buo.RevQuoteNo == null ? "" : buo.RevQuoteNo),// m.RevQuoteNo,
                    SampleTypeList = buo.Sam_Ord_Type.Select(h => new Domain.SampleTypeEntry()
                    {
                        Buy_Ord_MasId = (int)h.Buy_ord_masid,
                        SamTypeSeq = (int)h.SamTypeSeq,
                        //SampleType = h.SampleTypeMaster.SampleType,
                        SampleType=strrep.GetDataById((int)h.SamTypeId).SampleType.ToString(),
                        SampleTypeId = (int)h.SamTypeId,
                        SampleTypeQty = (int)h.SamTypeQty,
                    }).Where(x => x.Buy_Ord_MasId == buo.Buy_Ord_MasId).ToList(),

                    //Consignee_AddId = (int)buo.Consignee_AddId,
                    ParentOrdId = (int)ParId,
                    QuoteId = (int)(buo.QuoteId == null ? 0 : buo.QuoteId),
                    Rev = (buo.Rev == null ? "" : buo.Rev),
                    PlanPost = (buo.PlanPost == null ? "" : buo.PlanPost),
                    OrdPost = (buo.OrdPost == null ? "" : buo.OrdPost)
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<Domain.BulkOrder>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<BulkOrder> ListMainGrid(string Ref_No)
        {
            try
            {
                var Lman = bulkordRep.ListMainGrid(Ref_No);
                return new Response<Domain.BulkOrder>(new Domain.BulkOrder
                {
                    Ref_No = Lman.Ref_No,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.BulkOrder>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateBulkOrder(BulkOrder BulOrd)
        {


            int? AgnID = 0;

            if (BulOrd.AgentId == 0)
            {
                AgnID = null;
            }
            else
            {
                AgnID = BulOrd.AgentId;
            }


            int? BuyID = 0;

            if (BulOrd.BuyerId == 0)
            {
                BuyID = null;
            }
            else
            {
                BuyID = BulOrd.BuyerId;
            }


            int? PaySysID = 0;

            if (BulOrd.Pay_SystemId == 0)
            {
                PaySysID = null;
            }
            else
            {
                PaySysID = BulOrd.Pay_SystemId;
            }


            int? SysID = 0;

            if (BulOrd.SystemId == 0)
            {
                SysID = null;
            }
            else
            {
                SysID = BulOrd.SystemId;
            }


            int? PayModID = 0;

            if (BulOrd.Payment_ModeId == 0)
            {
                PayModID = null;
            }
            else
            {
                PayModID = BulOrd.Payment_ModeId;
            }

            int? ParId = 0;

            if (BulOrd.ParentOrdId == 0)
            {
                ParId = null;
            }
            else
            {
                ParId = BulOrd.ParentOrdId;
            }
            try
            {
                AxonApparel.Repository.Buy_Ord_Mas BMasInsert = new AxonApparel.Repository.Buy_Ord_Mas
                {
                    Order_No = BulOrd.Order_No,
                    Order_Date = BulOrd.Order_Date,
                    BuyerId = BuyID,//BulOrd.BuyerId,
                    Buyer_AddId = BuyID,//BulOrd.Buyer_AddId,
                    ManagerId = BulOrd.ManagerId,
                    MerchandiserId = BulOrd.MerchandiserId,
                    Ref_No = BulOrd.Ref_No,
                    Ref_Date = BulOrd.Ref_Date,
                    Pay_SystemId = PaySysID,//BulOrd.Pay_SystemId,
                    SystemId = SysID,//BulOrd.SystemId,
                    Payment_ModeId = PayModID,//BulOrd.Payment_ModeId,
                    AgentId = AgnID,
                    //AgentId = (BulOrd.AgentId == 0 ? DBNull. : BulOrd.AgentId),
                    Agent_AddId = AgnID,
                    ShipAgentId = BulOrd.ShipAgentId,
                    ShipAgent_AddId = BulOrd.ShipAgentId,
                    CurrencyId = BulOrd.CurrencyId,
                    Exchange = BulOrd.Exchange,
                    EnquiryId = BulOrd.EnquiryId,
                    Cancel = BulOrd.Cancel.ToUpper() == "TRUE",
                    Comit = BulOrd.Comit.ToUpper() == "TRUE",
                    CompanyId = BulOrd.CompanyId,
                    Closed = BulOrd.Closed,
                    CloseDate = BulOrd.CloseDate,
                    Quantity = BulOrd.Quantity,
                    Cost_def = BulOrd.Cost_def,
                    GuomId = BulOrd.GuomId,
                    Guom_Conv = (Int16)BulOrd.Guom_Conv,
                    Agency_Per = 1,
                    Bas_Unit = BulOrd.Bas_Unit,
                    Remarks = "",
                    ClaimType = BulOrd.ClaimType,
                    NominatedForwarder = BulOrd.NominatedForwarder,
                    CSP = BulOrd.CSP,
                    Buyer_Ref_No = BulOrd.Buyer_Ref_No,
                    TransAmend = BulOrd.TransAmend,
                    ConsigneeId = BulOrd.ConsigneeId,
                    CreatedBy = BulOrd.CreatedBy,
                    OrdType = BulOrd.OrdType,
                    Consignee_AddId = BulOrd.ConsigneeId,
                    ParentOrderId = ParId,
                    PA = BulOrd.PA,
                    QuoteId = BulOrd.QuoteId,
                    RevQuoteId = (int)BulOrd.RevQuoteId,
                    RevQuoteNo = BulOrd.RevQuoteNo,
                    Rev = BulOrd.Rev,
                    OrdPost = BulOrd.OrdPost,
                    PlanPost = BulOrd.PlanPost,
                    FOrderNo = BulOrd.FOrderNo,
                };

                var compList = new List<NominatedSupplier>();

                if (BulOrd.NSupplier != null)
                {
                    foreach (var PCompItem in BulOrd.NSupplier)
                    {
                        compList.Add(new NominatedSupplier
                        {
                            Itemid = (int)PCompItem.ItemId,
                            // NomSupId = PCompItem.NomSupId,
                            Order_no = PCompItem.NSOrderNo,
                            Supplierid = (int)PCompItem.SupplierId,
                            ORDERTYPE = "B",
                        });
                    }
                }

                var sampletypeList = new List<Sam_Ord_Type>();

                if (BulOrd.SampleTypeList != null)
                {
                    foreach (var SamTypelst in BulOrd.SampleTypeList)
                    {
                        sampletypeList.Add(new Sam_Ord_Type
                        {
                            SamTypeSeq = SamTypelst.SamTypeSeq,
                            SamTypeId = SamTypelst.SampleTypeId,
                            SamTypeQty = SamTypelst.SampleTypeQty
                        });
                    }
                }

                var result = bulkordRep.AddDetData(BMasInsert, compList, sampletypeList, BulOrd.Order_No);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<bool> UpdateBulkOrder(BulkOrder BulOrd)
        {


            try
            {

                int? AgnID = 0;

                if (BulOrd.AgentId == 0)
                {
                    AgnID = null;
                }
                else
                {
                    AgnID = BulOrd.AgentId;
                }

                int? BuyID = 0;

                if (BulOrd.BuyerId == 0)
                {
                    BuyID = null;
                }
                else
                {
                    BuyID = BulOrd.BuyerId;
                }


                int? PaySysID = 0;

                if (BulOrd.Pay_SystemId == 0)
                {
                    PaySysID = null;
                }
                else
                {
                    PaySysID = BulOrd.Pay_SystemId;
                }


                int? SysID = 0;

                if (BulOrd.SystemId == 0)
                {
                    SysID = null;
                }
                else
                {
                    SysID = BulOrd.SystemId;
                }


                int? PayModID = 0;

                if (BulOrd.Payment_ModeId == 0)
                {
                    PayModID = null;
                }
                else
                {
                    PayModID = BulOrd.Payment_ModeId;
                }

                int? ParId = 0;

                if (BulOrd.ParentOrdId == 0)
                {
                    ParId = null;
                }
                else
                {
                    ParId = BulOrd.ParentOrdId;
                }
                AxonApparel.Repository.Buy_Ord_Mas BMasEdit = new AxonApparel.Repository.Buy_Ord_Mas
                {

                    Buy_Ord_MasId = BulOrd.Buy_Ord_MasId,
                    Order_No = BulOrd.Order_No,
                    Order_Date = BulOrd.Order_Date,
                    BuyerId = BuyID,//BulOrd.BuyerId,
                    Buyer_AddId = BuyID,//BulOrd.Buyer_AddId,
                    ManagerId = BulOrd.ManagerId,
                    MerchandiserId = BulOrd.MerchandiserId,
                    Ref_No = BulOrd.Ref_No,
                    Ref_Date = BulOrd.Ref_Date,
                    Pay_SystemId = PaySysID,//BulOrd.Pay_SystemId,
                    SystemId = SysID,//BulOrd.SystemId,
                    Payment_ModeId = PayModID,//BulOrd.Payment_ModeId,
                    AgentId = AgnID,
                    // AgentId = BulOrd.AgentId == 0 ? null : BulOrd.AgentId,
                    Agent_AddId = AgnID,
                    ShipAgentId = BulOrd.ShipAgentId,
                    ShipAgent_AddId = BulOrd.ShipAgent_AddId,
                    CurrencyId = BulOrd.CurrencyId,
                    Exchange = BulOrd.Exchange,
                    EnquiryId = BulOrd.EnquiryId,
                    Cancel = BulOrd.Cancel.ToUpper() == "TRUE",
                    Comit = BulOrd.Comit.ToUpper() == "TRUE",
                    CompanyId = BulOrd.CompanyId,
                    Closed = BulOrd.Closed,
                    CloseDate = BulOrd.CloseDate,
                    Quantity = BulOrd.Quantity,
                    Cost_def = BulOrd.Cost_def,
                    GuomId = BulOrd.GuomId,
                    Guom_Conv = (Int16)BulOrd.Guom_Conv,
                    Agency_Per = BulOrd.Agency_Per,
                    Bas_Unit = BulOrd.Bas_Unit,
                    Remarks = BulOrd.Remarks,
                    ClaimType = BulOrd.ClaimType,
                    NominatedForwarder = BulOrd.NominatedForwarder,
                    CSP = BulOrd.CSP,
                    Buyer_Ref_No = BulOrd.Buyer_Ref_No,
                    TransAmend = BulOrd.TransAmend,
                    ConsigneeId = BulOrd.ConsigneeId,
                    CreatedBy = BulOrd.CreatedBy,
                    OrdType = BulOrd.OrdType,
                    Consignee_AddId = BulOrd.Consignee_AddId,
                    ParentOrderId = ParId,
                    QuoteId = BulOrd.QuoteId,
                    PA = BulOrd.PA,
                    RevQuoteId = (int)BulOrd.RevQuoteId,
                    RevQuoteNo = BulOrd.RevQuoteNo,
                    Rev = BulOrd.Rev,
                    OrdPost = BulOrd.OrdPost,
                    PlanPost = BulOrd.PlanPost,
                    FOrderNo = BulOrd.FOrderNo,
                };


                AxonApparel.Repository.BuyerAmendDetails BMasAmd = new AxonApparel.Repository.BuyerAmendDetails
                {
                    amendID = BulOrd.AmendId,
                    Styleid = BulOrd.StyId,
                    amendDate = BulOrd.Order_Date,
                    Order_no = BulOrd.Order_No,
                    AmendQty = BulOrd.Quantity,
                };


                var compList = new List<NominatedSupplier>();

                if (BulOrd.NSupplier != null)
                {
                    foreach (var PCompItem in BulOrd.NSupplier)
                    {
                        compList.Add(new NominatedSupplier
                        {
                            Itemid = (int)PCompItem.ItemId,
                            NomSupId = PCompItem.NomSupId,
                            Order_no = PCompItem.NSOrderNo,
                            Supplierid = (int)PCompItem.SupplierId,
                            ORDERTYPE = "B",
                        });
                    }
                }

                var sampletypeList = new List<Sam_Ord_Type>();

                if (BulOrd.SampleTypeList != null)
                {
                    foreach (var SamTypelst in BulOrd.SampleTypeList)
                    {
                        sampletypeList.Add(new Sam_Ord_Type
                        {
                            Buy_ord_masid = SamTypelst.Buy_Ord_MasId,
                            SamTypeId = SamTypelst.SampleTypeId,
                            SamTypeQty = SamTypelst.SampleTypeQty,
                            SamTypeSeq = SamTypelst.SamTypeSeq
                        });
                    }
                }

                var result = bulkordRep.UpdateDetData(BMasEdit, compList, sampletypeList, BulOrd.Order_No, BMasAmd);


                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }




        public Response<bool> DeleteBulkOrder(int Buy_Ord_MasId)
        {
            return new Response<bool>(bulkordRep.DeleteData(Buy_Ord_MasId), Status.SUCCESS, "Deleted Successfully");
        }


        public Response<IEnumerable<BulkOrder>> GetRefNo()
        {
            try
            {
                var OrdList = bulkordRep.GetDataListAll();
                return new Response<IEnumerable<Domain.BulkOrder>>(OrdList.Select(m => new Domain.BulkOrder
                {
                    Ref_No = m.Ref_No,
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    OrdType = m.OrdType
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IEnumerable<BulkOrder>> GetOrderNoList()
        {
            try
            {
                var OrdList = bulkordRep.GetDataListAll();
                return new Response<IEnumerable<Domain.BulkOrder>>(OrdList.Select(m => new Domain.BulkOrder
                {
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    Order_No = m.Order_No
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<BulkOrder>> GetBulkOrderTest(BulkOrder BulOrd)
        {
            throw new NotImplementedException();
        }

        public Response<IQueryable<Domain.BulkOrder>> MainGetTargetBulkOrder(int? companyId, string orderNo, string RefNo, int? BuyerId, string fromDate, string toDate, string OrderType)
        {
            try
            {
                var CurDetList = bulkordRep.MainGetTargetBulkOrder(companyId, orderNo, RefNo, BuyerId, fromDate, toDate, OrderType);

                return new Response<IQueryable<Domain.BulkOrder>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.BulkOrder>> MainGetBulkOrder(int? companyId, string orderNo, string RefNo, int? BuyerId, string fromDate, string toDate, string OrderType, string DispatchClosed)
        {
            try
            {
                var CurDetList = bulkordRep.GetDataMainList(companyId, orderNo, RefNo, BuyerId, fromDate, toDate, OrderType, DispatchClosed);

                return new Response<IQueryable<Domain.BulkOrder>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<BulkOrder>> GetNom(int BMasID)
        {
            try
            {
                var CurDetList = bulkordRep.GetRepGetNomSupplier(BMasID);

                return new Response<IList<BulkOrder>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<BulkOrder>> GetNomItem(string Supplier, int BMasID)
        {
            try
            {
                var CurDetList = bulkordRep.GetRepGetNomItemSupplier(Supplier, BMasID);

                return new Response<IList<BulkOrder>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }






        public Response<BulkOrder> GetDataByRef(string RefNo)
        {
            try
            {
                var buo = bulkordRep.CheckRefRep(RefNo);


                return new Response<Domain.BulkOrder>(new Domain.BulkOrder
                {

                    Buy_Ord_MasId = buo.Buy_Ord_MasId,
                    Ref_No = buo.Ref_No,

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.BulkOrder>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IEnumerable<BulkOrder>> GetBuyRefNoList()
        {
            try
            {
                var OrdList = bulkordRep.GetDataListAll();
                return new Response<IEnumerable<Domain.BulkOrder>>(OrdList.Select(m => new Domain.BulkOrder
                {
                    Buyer_Ref_No = m.Buyer_Ref_No,
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<BulkOrder>> GetDataCheckPlanJobDetails(string OrdNo)
        {
            try
            {
                var ProdutWO = bulkordRep.GetDataRepCheckPlanJobDetails(OrdNo);

                return new Response<IQueryable<BulkOrder>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IEnumerable<BulkOrder>> GetBulkOrderRefNo()
        {
            try
            {
                var OrdList = bulkordRep.GetDataListAll();
                return new Response<IEnumerable<Domain.BulkOrder>>(OrdList.Select(m => new Domain.BulkOrder
                {
                    Ref_No = m.Ref_No,
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    OrdType = m.OrdType,
                }).Where(q => q.OrdType == "B"), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IEnumerable<BulkOrder>> GetSampleOrderNo()
        {
            try
            {
                var OrdList = bulkordRep.GetDataListAll();
                return new Response<IEnumerable<Domain.BulkOrder>>(OrdList.Select(m => new Domain.BulkOrder
                {
                    Order_No = m.Order_No,
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    OrdType = m.OrdType,
                }).Where(q => q.OrdType == "S"), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<BulkOrder>> GetBulkOrderNo()
        {
            try
            {
                var OrdList = bulkordRep.GetDataListAll();
                return new Response<IEnumerable<Domain.BulkOrder>>(OrdList.Select(m => new Domain.BulkOrder
                {
                    Order_No = m.Order_No,
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    OrdType = m.OrdType,
                }).Where(q => q.OrdType == "B"), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
