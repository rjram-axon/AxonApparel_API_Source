using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class QuotationAddBusiness : IQuotationAddBusiness
    {
        IQuotationAddRepository stkRep = new QuotationAddRepository();

        public Response<IEnumerable<Domain.MarkQuoteMas>> GetQuotationNo()
        {
            try
            {
                var strlist = stkRep.GetQuotationNo();
                return new Response<IEnumerable<Domain.MarkQuoteMas>>(strlist.Select(m => new Domain.MarkQuoteMas
                {
                    QuoteID = m.QuoteID,
                    QuoteNo = m.QuoteNo
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.MarkQuoteMas>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<IQueryable<Domain.MarkQuoteProcess>> Getprocess()
        {
            try
            {
                var ProductWO = stkRep.Getprocess();

                return new Response<IQueryable<Domain.MarkQuoteProcess>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteProcess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.MarkQuoteAcc>> GetUom(int itemid)
        {
            try
            {
                var ProductWO = stkRep.Getuom(itemid);

                return new Response<IQueryable<Domain.MarkQuoteAcc>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteAcc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateUnitEntry(Domain.MarkQuoteMas GrnEntry)
        {
            int? categoryid = 0;
            int? enquiryid = 0;
            if (GrnEntry.CategoryId == 0)
            {
                categoryid = null;
            }
            else
            {
                categoryid = GrnEntry.CategoryId;
            }
            if (GrnEntry.EnquiryId == 0)
            {
                enquiryid = null;
            }
            else
            {
                enquiryid = GrnEntry.EnquiryId;
            }
            try
            {
                var ItmList = new List<MarkQuoteFab>();

                foreach (var PItem in GrnEntry.FabDetails)
                {
                    ItmList.Add(new MarkQuoteFab
                    {
                        //QuoteId = QID,//PItem.QuoteId,
                        DetId = PItem.DetId,
                        CompID = PItem.CompID,
                        FabID = PItem.FabID,
                        Weight = PItem.Weight,
                        Remarks = PItem.Remarks,
                        Fab_purchase = PItem.Fab_purchase,
                        BaseQty = PItem.BaseQty,
                        Uomid = PItem.Uomid,
                        GSM = PItem.GSM
                    });
                }

                var yarnList = new List<MarkQuoteYarn>();

                foreach (var yItem in GrnEntry.YarnDetails)
                {
                    yarnList.Add(new MarkQuoteYarn
                    {
                        Markquoteyarnid = yItem.Markquoteyarnid,
                        //QuoteId = QID,// yItem.QuoteId,
                        FabID = yItem.FabID,
                        Itemid = yItem.Itemid,
                        Sizeid = yItem.Sizeid,
                        Percentage = yItem.Percentage,
                        Weight = yItem.Weight,
                        CostPerKG = yItem.CostPerKG,
                        ComponentId=yItem.ComponentId,
                    });
                }

                var processList = new List<MarkQuoteProcess>();

                foreach (var prItem in GrnEntry.ProcessDetails)
                {
                    processList.Add(new MarkQuoteProcess
                    {
                        //QuoteID = QID,// yItem.QuoteId,
                        ProcessId = prItem.ProcessId,
                        Fabricid = prItem.Fabricid,
                        Cost = prItem.Cost,
                        Detid = prItem.Detid,
                        ComponentId=prItem.ComponentId,
                    });
                }

                var bomList = new List<MarkQuoteAcc>();

                foreach (var bomItem in GrnEntry.AccDetails)
                {
                    bomList.Add(new MarkQuoteAcc
                    {
                        MarkquoteaccId = bomItem.MarkquoteaccId,
                        //QuoteId = QID,// yItem.QuoteId,
                        ItemID = bomItem.ItemID,
                        Uomid = bomItem.Uomid,
                        Quantity = bomItem.Quantity,
                        UnitCost = bomItem.UnitCost,
                        Remarks = bomItem.Remarks,
                        ItemType = bomItem.ItemType,
                    });
                }

                var cmtList = new List<MarkQuoteCMT>();

                foreach (var cmtItem in GrnEntry.CmtDetails)
                {
                    cmtList.Add(new MarkQuoteCMT
                    {
                        MarkquoteCmtId = cmtItem.MarkquoteCmtId,
                        //QuoteId = QID,// yItem.QuoteId,
                        ProcessID = cmtItem.ProcessID,
                        Cost = cmtItem.Cost,
                        Remarks = cmtItem.Remarks,
                    });
                }

                var commList = new List<MarkQuoteCommercial>();

                foreach (var bomItem in GrnEntry.CommDetails)
                {
                    commList.Add(new MarkQuoteCommercial
                    {
                        MarkquoteCommercialId = bomItem.MarkquoteCommercialId,
                        //QuoteId = QID,// yItem.QuoteId,
                        ParticularID = bomItem.ParticularID,
                        Cost = bomItem.Cost,
                        Remarks = bomItem.Remarks,
                    });
                }

                var QID = stkRep.AddData(new AxonApparel.Repository.MarkQuoteMas
                {
                    QuoteID = GrnEntry.QuoteID,
                    QuoteNo = GrnEntry.QuoteNo,
                    QuoteDate = GrnEntry.QuoteDate,
                    QuoteType = GrnEntry.QuoteType,
                    Companyid = GrnEntry.Companyid,
                    BuyerId = GrnEntry.BuyerId,
                    EnquiryId = enquiryid,//GrnEntry.EnquiryId,
                    StyleId = GrnEntry.StyleId,
                    CategoryId = categoryid,// GrnEntry.CategoryId,
                    GuomId=GrnEntry.Guomid,
                    //YarnAdd = GrnEntry.YarnAdd,
                    //ProcessAdd = GrnEntry.ProcessAdd,
                    //AccAdd = GrnEntry.AccAdd,
                    //CMTadd = GrnEntry.CMTadd,
                    //CommercialAdd = GrnEntry.CommercialAdd,
                    FabricCost = GrnEntry.FabricCost,
                    AccessoryCost = GrnEntry.AccessoryCost,
                    CMTcost = GrnEntry.CMTcost,
                    Commercial = GrnEntry.Commercial,
                    TotalCost = GrnEntry.TotalCost,
                    ProfitPercent = GrnEntry.ProfitPercent,
                    CurrencyID = GrnEntry.CurrencyID,
                    ExchangeRate = GrnEntry.ExchangeRate,
                    Remarks = GrnEntry.Remarks,
                    QuotedRate = GrnEntry.QuotedRate,
                    TemplateName = GrnEntry.TemplateName,
                    CreatedBy = GrnEntry.CreatedBy,
                    OrderQty = GrnEntry.OrderQty,
                    RefNo = GrnEntry.RefNo,
                    ProcessWastagePer = GrnEntry.WastagePer,
                    BuyerPrice = GrnEntry.BuyerPrice,
                    PA = GrnEntry.PA,
                    ProcessAdd=GrnEntry.ProcessAdd,
                    AccAdd=GrnEntry.AccAdd,
                    CMTadd = GrnEntry.CMTadd,
                    CommercialAdd=GrnEntry.CommercialAdd,
                    SummAdd=GrnEntry.SummaryAdd,


                }, ItmList, yarnList, processList, bomList, cmtList, commList, "Add");

                //var result = stkRep.AddDetData(ItmList, yarnList, processList, bomList, cmtList, commList, "Add");

                if (QID > 0)
                {
                    return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
                }
                else
                {
                    return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
                }
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Update(Domain.MarkQuoteMas obj)
        {
            try
            {
                var ItmList = new List<MarkQuoteFab>();

                foreach (var PItem in obj.FabDetails)
                {
                    ItmList.Add(new MarkQuoteFab
                    {
                        QuoteId = PItem.QuoteId,// QID,//PItem.QuoteId,
                        DetId = PItem.DetId,
                        CompID = PItem.CompID,
                        FabID = PItem.FabID,
                        Weight = PItem.Weight,
                        Remarks = PItem.Remarks,
                        Fab_purchase = PItem.Fab_purchase,
                        BaseQty = PItem.BaseQty,
                        Uomid = PItem.Uomid,
                        GSM = PItem.GSM

                    });

                }

                var yarnList = new List<MarkQuoteYarn>();

                foreach (var yItem in obj.YarnDetails)
                {
                    yarnList.Add(new MarkQuoteYarn
                    {
                        Markquoteyarnid = yItem.Markquoteyarnid,
                        QuoteId = yItem.QuoteId,//QID,// yItem.QuoteId,
                        FabID = yItem.FabID,
                        Itemid = yItem.Itemid,
                        Sizeid = yItem.Sizeid,
                        Percentage = yItem.Percentage,
                        Weight = yItem.Weight,
                        CostPerKG = yItem.CostPerKG,
                        ComponentId = yItem.ComponentId,
                    });

                }
                var processList = new List<MarkQuoteProcess>();

                foreach (var prItem in obj.ProcessDetails)
                {
                    processList.Add(new MarkQuoteProcess
                    {

                        QuoteID = prItem.QuoteID,//QID,// yItem.QuoteId,
                        ProcessId = prItem.ProcessId,
                        Fabricid = prItem.Fabricid,
                        Cost = prItem.Cost,
                        Detid = prItem.Detid,
                        ComponentId = prItem.ComponentId,
                    });

                }
                var bomList = new List<MarkQuoteAcc>();

                foreach (var bomItem in obj.AccDetails)
                {
                    bomList.Add(new MarkQuoteAcc
                    {
                        MarkquoteaccId = bomItem.MarkquoteaccId,
                        QuoteId = bomItem.QuoteId,//QID,// yItem.QuoteId,
                        ItemID = bomItem.ItemID,
                        Uomid = bomItem.Uomid,
                        Quantity = bomItem.Quantity,
                        UnitCost = bomItem.UnitCost,
                        Remarks = bomItem.Remarks,
                        ItemType = bomItem.ItemType,
                    });
                }

                var cmtList = new List<MarkQuoteCMT>();

                foreach (var cmtItem in obj.CmtDetails)
                {
                    cmtList.Add(new MarkQuoteCMT
                    {
                        MarkquoteCmtId = cmtItem.MarkquoteCmtId,
                        QuoteId = cmtItem.QuoteId,//QID,// yItem.QuoteId,
                        ProcessID = cmtItem.ProcessID,
                        Cost = cmtItem.Cost,
                        Remarks = cmtItem.Remarks,
                    });
                }

                var commList = new List<MarkQuoteCommercial>();

                foreach (var bomItem in obj.CommDetails)
                {
                    commList.Add(new MarkQuoteCommercial
                    {
                        MarkquoteCommercialId = bomItem.MarkquoteCommercialId,
                        QuoteId = bomItem.QuoteId,// QID,// yItem.QuoteId,
                        ParticularID = bomItem.ParticularID,
                        Cost = bomItem.Cost,
                        Remarks = bomItem.Remarks,
                    });
                }

                var QID = stkRep.UpdateData(new AxonApparel.Repository.MarkQuoteMas
                {
                    QuoteID = obj.QuoteID,
                    QuoteNo = obj.QuoteNo,
                    QuoteDate = obj.QuoteDate,
                    QuoteType = obj.QuoteType,
                    Companyid = obj.Companyid,
                    BuyerId = obj.BuyerId,
                    EnquiryId = obj.EnquiryId,
                    StyleId = obj.StyleId,
                    CategoryId = obj.CategoryId,
                    GuomId = obj.Guomid,
                    //YarnAdd = GrnEntry.YarnAdd,
                    ProcessAdd = obj.ProcessAdd,
                    AccAdd = obj.AccAdd,
                    CMTadd = obj.CMTadd,
                    CommercialAdd = obj.CommercialAdd,
                    SummAdd=obj.SummaryAdd,
                    FabricCost = obj.FabricCost,
                    AccessoryCost = obj.AccessoryCost,
                    CMTcost = obj.CMTcost,
                    Commercial = obj.Commercial,
                    TotalCost = obj.TotalCost,
                    ProfitPercent = obj.ProfitPercent,
                    CurrencyID = obj.CurrencyID,
                    ExchangeRate = obj.ExchangeRate,
                    Remarks = obj.Remarks,
                    QuotedRate = obj.QuotedRate,
                    TemplateName = obj.TemplateName,
                    CreatedBy = obj.CreatedBy,
                    OrderQty = obj.OrderQty,
                    RefNo = obj.RefNo,
                    ProcessWastagePer = obj.WastagePer,
                    BuyerPrice = obj.BuyerPrice,
                    PA = obj.PA,
                    Modifiedby = obj.ModifyBy,
                    Modifieddate = obj.ModifyDate,
                }, ItmList, yarnList, processList, bomList, cmtList, commList, "Update");

                if (QID)
                {
                    //var result = stkRep.AddDetData(ItmList, yarnList, processList, bomList, cmtList, commList, "Update");
                    return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
                }
                else
                {
                    return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
                }
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.MarkQuoteMas>> GetMasdet(int qid)
        {
            try
            {
                var ProductWO = stkRep.Getmasdet(qid);

                return new Response<IQueryable<Domain.MarkQuoteMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.MarkQuoteFab>> GetFabdet(int qid)
        {
            try
            {
                var ProductWO = stkRep.Getfabdet(qid);

                return new Response<IQueryable<Domain.MarkQuoteFab>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteFab>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.MarkQuoteYarn>> Getyarndet(int qid)
        {
            try
            {
                var ProductWO = stkRep.Getyarndet(qid);

                return new Response<IQueryable<Domain.MarkQuoteYarn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteYarn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.MarkQuoteProcess>> Getprocdet(int qid)
        {
            try
            {
                var ProductWO = stkRep.Getprocdet(qid);

                return new Response<IQueryable<Domain.MarkQuoteProcess>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteProcess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.MarkQuoteAcc>> Getbomdet(int qid)
        {
            try
            {
                var ProductWO = stkRep.Getbomdet(qid);

                return new Response<IQueryable<Domain.MarkQuoteAcc>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteAcc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.MarkQuoteCMT>> Getcmtdet(int qid)
        {
            try
            {
                var ProductWO = stkRep.Getcmtdet(qid);

                return new Response<IQueryable<Domain.MarkQuoteCMT>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteCMT>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.MarkQuoteCommercial>> Getcommdet(int qid)
        {
            try
            {
                var ProductWO = stkRep.Getcommdet(qid);

                return new Response<IQueryable<Domain.MarkQuoteCommercial>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteCommercial>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }





        public Response<bool> Delete(int id)
        {
            return new Response<bool>(stkRep.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<IQueryable<Domain.MarkQuoteMas>> Getquoenqno(int cid)
        {
            try
            {
                var ProductWO = stkRep.Getenqno(cid);

                return new Response<IQueryable<Domain.MarkQuoteMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.MarkQuoteMas>> Getquoenqdet(string enqno)
        {
            try
            {
                var ProductWO = stkRep.Getenqnodet(enqno);

                return new Response<IQueryable<Domain.MarkQuoteMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MarkQuoteMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
