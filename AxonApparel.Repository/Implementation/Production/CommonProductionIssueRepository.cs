using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class CommonProductionIssueRepository : IcommonProductionIssueRepository
    {
        ProductionEntities entities = new ProductionEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();


        public IQueryable<CommonProductionIssue> GetCommonProductionIssueCompDetails(int CompanyId, int CompanyUnitId, int ProcessId, string Ordertype, string ProcessType, string RefNo, string OrdNo)
        {

            int styleid = 0;
            IQueryable<CommonProductionIssue> query = (from T in entities.Proc_Apparel_GetCommonProductionIssueDet(CompanyId, CompanyUnitId, ProcessId, ProcessType, Ordertype, RefNo, styleid, OrdNo)
                                                       select new CommonProductionIssue
                                                       {
                                                           ProdPrgId = T.prodprgid,
                                                           ProdPrgramNo = T.ProdPrgNo,
                                                           ProdProgramDate = (DateTime)T.ProgDate,
                                                           JobOrdNo = T.Job_ord_no,
                                                           CompanyUnit = T.companyunit,
                                                           ProcessId = (int)T.ProcessId,
                                                           Process = T.Process,
                                                           Buyer = T.Buyer
                                                       }).AsQueryable();
            return query;
        }

        public IQueryable<CommonProductionIssueDet> GetCommProdIssItemDetailsforEdit(int ProdIssueId)
        {
            IQueryable<CommonProductionIssueDet> query = (from T in entities.Proc_Apparel_GetCommonProdItemDetail(ProdIssueId)
                                                          select new CommonProductionIssueDet
                                                          {
                                                              Sno = Convert.ToInt16(T.Sno),
                                                              //ProdProgDetId=T.ProdPrgDetid,
                                                              ItemId = (int)T.itemid,
                                                              Item = T.Item,
                                                              ColorId = (int)T.colorid,
                                                              Color = T.Color,
                                                              Size = T.Size,
                                                              SizeId = (int)T.sizeid,
                                                              ProdPrgQty = (decimal)T.Prog_Op_Qty,
                                                              BalanceQty = (decimal)T.Balance + (decimal)T.IssueQty,
                                                              IssueQty = (decimal)T.IssueQty,
                                                              UOM = T.UOM,
                                                              //UomId = T.UomId,
                                                              OutUOM = T.ouom,
                                                              OutUomId = T.ouomid,
                                                              Rate = (decimal)T.Rate,
                                                              AppRate = (decimal)T.Apprate,
                                                              ProductionId = (int)T.ProdIssueId,
                                                              OrderNo = T.orderno,
                                                              RefNo = T.refno,
                                                              ProdPrgNo=T.ProdPrgNo
                                                          }).AsQueryable();
            return query;
            //throw new NotImplementedException();
        }

        public IQueryable<CommonProductionIssueDet> GetCommonProductionIssueDetails(string NoofPrgId, string InorOut)
        {
            IQueryable<CommonProductionIssueDet> query = (from T in entities.Proc_Apparel_GetItemStockAdjustmentDetail(NoofPrgId, InorOut)
                                                          select new CommonProductionIssueDet
                                                          {
                                                              Sno = Convert.ToInt16(T.Sno),
                                                              //ProdProgDetId=T.ProdPrgDetid,
                                                              ItemId = (int)T.itemid,
                                                              Item = T.Item,
                                                              ColorId = (int)T.colorid,
                                                              Color = T.Color,
                                                              Size = T.Size,
                                                              SizeId = (int)T.sizeid,
                                                              ProdPrgQty = (decimal)T.Prog_Op_Qty,
                                                              BalanceQty = (decimal)(T.Balance == null ? 0 : T.Balance),
                                                              IssueQty = (decimal)T.IssueQty,
                                                              UOM = T.UOM,
                                                              UomId = T.UomId,
                                                              OutUOM = T.ouom,
                                                              OutUomId = T.ouomid,
                                                              Rate = (decimal)T.Rate,
                                                              AppRate = (decimal)T.Apprate,
                                                              ProdPrgNo = T.ProdPrgNo
                                                              //ProductionDetId = T.ProductionDetId,
                                                              //ItemId = (int)T.itemid,
                                                              //Item = T.item,
                                                              //ColorId = (int)T.colorid,
                                                              //Color = T.color,
                                                              //Size = T.size,
                                                              //SizeId = (int)T.sizeid,
                                                              //OrderedQty = T.OrderedQuantity,
                                                              //BalanceQty = (decimal)(T.BalanceQuantity == null ? 0 : T.BalanceQuantity),
                                                              //IssueQty = (decimal)T.IssuedQuantity,
                                                              //UomId = (int)T.uomid,
                                                              //UOM = T.Uom,
                                                          }).AsQueryable();
            return query;

            //throw new NotImplementedException();
        }

        public IQueryable<CommonProductionJobOrderDet> GetCommonProductionJobOrdDetails(string ProdPrgId)
        {
            IQueryable<CommonProductionJobOrderDet> query = (from T in entities.Proc_Apparel_GetCommonProdJobOrderInfo(ProdPrgId)
                                                             select new CommonProductionJobOrderDet
                                                             {
                                                                 Sno = Convert.ToInt16(T.Sno),
                                                                 ProdPrgNo = T.ProdPrgNo,
                                                                 JobOrdNo = T.job_ord_no,
                                                                 //ProcessJobDetId = T.ProcessJobDetid,
                                                                 BalQty = (decimal)(T.Balance == null ? 0 : T.Balance),
                                                                 IssQty = (decimal)T.IssueQty,
                                                                 //SecQty = (decimal)T.SecQty,
                                                                 ItemId = (int)T.itemid,
                                                                 ColorId = (int)T.colorid,
                                                                 SizeId = (int)T.sizeid,
                                                                 OrderNo=T.Order_No,
                                                                 RefNo=T.Ref_No
                                                                 //ProdDetId = (int)T.ProdDetId
                                                             }).AsQueryable();
            return query;
            //throw new NotImplementedException();
        }

        public IQueryable<CommonProductionJobOrderDet> GetCommProdJobOrdDetailsforEdit(int ProdIssueId)
        {
            IQueryable<CommonProductionJobOrderDet> query = (from T in entities.Proc_Apparel_GetCommonProdJobOrderDetail(ProdIssueId)
                                                             select new CommonProductionJobOrderDet
                                                             {
                                                                 Sno = Convert.ToInt16(T.Sno),
                                                                 ProdPrgNo = T.ProdPrgNo,
                                                                 JobOrdNo = T.job_ord_no,
                                                                 //ProcessJobDetId = T.ProcessJobDetid,
                                                                 BalQty = (decimal)(T.Balance == null ? 0 : (T.Balance + T.IssueQty)),
                                                                 IssQty = (decimal)T.IssueQty,
                                                                 //SecQty = (decimal)T.SecQty,
                                                                 ItemId = (int)T.itemid,
                                                                 ColorId = (int)T.colorid,
                                                                 SizeId = (int)T.sizeid,
                                                                 ProcessJobDetId = (int)T.ProdIssueJobId,
                                                                 ProcessIssId = (int)T.ProdIssueId,
                                                                 //ProdDetId = (int)T.ProdDetId
                                                                 OrderNo =T.orderno ,
                                                                 RefNo =T.refno ,
                                                             }).AsQueryable();
            return query;
            //throw new NotImplementedException();
        }

        public IQueryable<CommonProductionStckDet> GetCommonProductionStckDetforEdit(int CompanyId, int ProdIssueId)
        {
            IQueryable<CommonProductionStckDet> query = (from T in entities.Proc_Apparel_GetCommonProdItemStockforEdit(CompanyId, ProdIssueId)
                                                         select new CommonProductionStckDet
                                                         {
                                                             StockId = T.stockid,
                                                             DocumentNo = T.Transno,
                                                             JobOrdNo = T.joborderNo,
                                                             Stock = (decimal)(T.balQty == null ? 0 : (T.balQty + T.Issue)),
                                                             Issues = T.Issue,
                                                             Process = T.Process,
                                                             Manufacturer = T.Supplier,
                                                             ItemId = (int)T.itemid,
                                                             ColorId = (int)T.colorid,
                                                             SizeId = (int)T.sizeid,
                                                             ProdStockDetId = (int)T.ProdIssStockId,
                                                             ProdPrgNo=T.ProdPrgNo,
                                                             MarkupRate = (decimal)T.MarkupRate
                                                         }).AsQueryable();
            return query;
            //throw new NotImplementedException();
        }

        public IQueryable<CommonProductionStckDet> GetCommonProductionStckDet(int CompanyId, string JobOrdNo, int Itemid, int Colorid, int Sizeid,string Programid,int storeid)
        {
            IQueryable<CommonProductionStckDet> query = (from T in entities.Proc_Apparel_GetCommonProdItemStock(CompanyId, JobOrdNo, Itemid, Colorid, Sizeid, Programid, storeid)
                                                         select new CommonProductionStckDet
                                                         {
                                                             StockId = T.StockId,
                                                             DocumentNo = T.Transno,
                                                             JobOrdNo = T.joborderNo,
                                                             Stock = (decimal)(T.balQty == null ? 0 : T.balQty),
                                                             Issues = T.Issue,
                                                             Process = T.process,
                                                             Manufacturer = T.supplier,
                                                             ItemId = (int)T.ItemId,
                                                             ColorId = (int)T.ColorId,
                                                             SizeId = (int)T.SizeId,
                                                             ProdJobDetId = T.ProdJobDetId,
                                                             ProdPrgNo="",
                                                             MarkupRate = (decimal)T.Markup_Rate
                                                         }).AsQueryable();
            return query;
        }

        public IQueryable<ProductionIssueMas> GetCommProdIssueHeaderInfo(int ProdIssId)
        {
            IQueryable<ProductionIssueMas> query = (from T in entities.Proc_Apparel_CommonProdHeaderDetails(ProdIssId)
                                                    select new ProductionIssueMas
                                                    {
                                                        ProdIssueId = T.ProdIssueId,
                                                        ProdIssueNo = T.ProdIssueNo,
                                                        ProdIssueDate = (DateTime)T.ProdIssueDate,
                                                        Remarks = T.Remarks,
                                                        LastProcessId = (int)T.lastprocessid,
                                                        GatePassVehicle = T.GatePassVehicle,
                                                        ProcessId = (int)T.ProcessId,
                                                        ProcessorId = (int)T.processorid,
                                                        CompanyUnitId = (int)T.CompanyUnitId,
                                                        InterExter = T.InternalOrExternal,
                                                        Processor = T.processor,
                                                        OrderType = T.OrderType,
                                                    }).AsQueryable();
            return query;
            //throw new NotImplementedException();
        }

        public bool AddProductionIssue(ProductionIssueMas objAdd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));

                    var id = entities.Proc_Apparel_ProdIssueMasInsert(objAdd.ProdOrdId, objAdd.ProdIssueNo, objAdd.ProdIssueDate,
                        objAdd.GatePassVehicle, objAdd.Remarks, objAdd.Createdby, objAdd.IssueStoreId, objAdd.ProcessorId, objAdd.ProcessId, objAdd.CompanyUnitId, objAdd.OrderType, objAdd.CompanyId, objAdd.LastProcessId, objAdd.InterExter, objParam);

                    entities.SaveChanges();
                    id = Convert.ToInt16(objParam.Value);

                    //Insert into Prod_iss_det 
                    var ProdissdetList = new List<Domain.ProductionIssueDet>();

                    if (objAdd.ProdIssueDet.Count > 0)
                    {
                        foreach (var item in objAdd.ProdIssueDet)
                        {
                            if (item.IssueQty > 0)
                            {
                                ProdissdetList.Add(new Domain.ProductionIssueDet
                                {
                                    ProdIssueId = id,
                                    ItemId = item.ItemId,
                                    ColorId = item.ColorId,
                                    SizeId = item.SizeId,
                                    IssueQty = item.IssueQty,
                                    UomId = item.UomId,
                                    IPMarkupRate = item.IPMarkupRate,
                                    Rate = item.Rate
                                });
                            }
                        }
                    }

                    var prodissueDetresult = AddProductionIssueDet(ProdissdetList, "Add", objAdd);

                    //Insert into prod_iss_jobdet and Update Issue Qty in Prod_Prg_Det
                    var ProdissjoborddetList = new List<Domain.ProductionIssueJobDet>();

                    if (objAdd.ProdIssueJobOrdDet.Count > 0)
                    {
                        foreach (var item in objAdd.ProdIssueJobOrdDet)
                        {
                            if (item.IssQty > 0)
                            {
                                ProdissjoborddetList.Add(new Domain.ProductionIssueJobDet
                                {
                                    ProdIssueId = id,
                                    ProdIssueDetId = item.ProdIssueDetId,
                                    JobOrdNo = item.JobOrdNo,
                                    ProdPrgNo = item.ProdPrgNo,
                                    IssQty = item.IssQty,
                                    ItemId = item.ItemId,
                                    ColorId = item.ColorId,
                                    SizeId = item.SizeId,
                                    LastProcessId = (int)objAdd.LastProcessId,
                                });
                            }
                        }
                    }

                    var prodissuejobDetresult = AddProductionIssueJobDet(ProdissjoborddetList, "Add");

                    //Insert into prod_iss_stock
                    var ProdissjobordstckdetList = new List<Domain.ProductionIssueStock>();

                    if (objAdd.ProdIssueStck.Count > 0)
                    {
                        foreach (var itemstck in objAdd.ProdIssueStck)
                        {
                            if (itemstck.Issues > 0)
                            {
                                ProdissjobordstckdetList.Add(new Domain.ProductionIssueStock
                                {
                                    ProdIssueId = id,
                                    ProdIssueJobId = 0,
                                    StockId = itemstck.StockId,
                                    Issues = itemstck.Issues,
                                    ItemId = itemstck.ItemId,
                                    ColorId = itemstck.ColorId,
                                    SizeId = itemstck.SizeId
                                });

                                var mrupdate = entities.ItemStock.Where(a => a.StockId == itemstck.StockId).FirstOrDefault();
                                mrupdate.Markup_Rate = itemstck.Markuprate;
                                entities.SaveChanges();

                            }
                        }
                    }

                    var prodissuestckresult = AddProductionIssueStck(ProdissjobordstckdetList, "Add");

                    var MarkUpRate = UpdateMarkUpRate(id);
                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool UpdateMarkUpRate(int ProdIssueId)
        {
            try
            {
                var upd = entities.Proc_Apparel_UpdateCommonProdIssueMarkUpRate(ProdIssueId);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public bool AddProductionIssueDet(List<ProductionIssueDet> objProdIssDet, string Mode, ProductionIssueMas ProdIssueMas)
        {
            try
            {

                if (Mode == "Update")
                {
                    //foreach (var item in objShipDet)
                    //{
                    //    styleid = item.StyleId;
                    //}
                    ////delete StyleDetail Many Rows table
                    //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                    //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
                    //entities.SaveChanges();
                }

                var ProdIssdetList = new List<Prod_iss_det>();
                var ProdIssstockoutwardList = new List<ProductionItem_stock_outward>();

                int ProdIssueDetId = 0;

                foreach (var item in objProdIssDet)
                {
                    //entities.Job_Ord_Det.Add(item);
                    ProdIssdetList.Add(new Repository.Prod_iss_det
                    {
                        ProdIssueId = item.ProdIssueId,
                        itemid = item.ItemId,
                        colorid = item.ColorId,
                        sizeid = item.SizeId,
                        IssueQty = item.IssueQty,
                        OutputUom = item.UomId,
                        IPMarkup_Rate = item.IPMarkupRate,
                        Rate = item.Rate
                    });
                }

                foreach (var prodissdetlst in ProdIssdetList)
                {
                    entities.Prod_iss_det.Add(prodissdetlst);
                    entities.SaveChanges();

                    ProdIssueDetId = prodissdetlst.ProdIssueDetId;

                    foreach (var itemstckout in ProdIssueMas.ProdIssueStck)
                    {
                        var itmstock = entities.ItemStock.Where(i => i.StockId == itemstckout.StockId).FirstOrDefault();

                        if (itemstckout.Issues > 0)
                        {
                            if (itmstock != null)
                            {
                                if (itmstock.Itemid == prodissdetlst.itemid && itmstock.Colorid == prodissdetlst.colorid && itmstock.sizeid == prodissdetlst.sizeid)
                                {
                                    ProdIssstockoutwardList.Add(new Repository.ProductionItem_stock_outward
                                    {
                                        Itemstockid = itemstckout.StockId,
                                        outwarddate = ProdIssueMas.ProdIssueDate,
                                        TransNo = ProdIssueMas.ProdIssueNo,
                                        TransType = "GPI",
                                        Quantity = itemstckout.Issues,
                                        joborderno = itemstckout.JobOrdNo,
                                        ProdIssueDetID = ProdIssueDetId,
                                        Unit_Or_Other = "W",
                                       
                                    });
                                }
                            }
                        }
                    }
                }

                //foreach (var itemstckout in ProdIssueMas.ProdIssueStck)
                //{
                //    if (itemstckout.Issues > 0)
                //    {
                //        ProdIssstockoutwardList.Add(new Repository.Item_stock_outward
                //        {
                //            Itemstockid = itemstckout.StockId,
                //            outwarddate = ProdIssueMas.ProdIssueDate,
                //            TransNo = ProdIssueMas.ProdIssueNo,
                //            TransType = "CIS",
                //            Quantity = itemstckout.Issues,
                //            joborderno = itemstckout.JobOrdNo,
                //            ProdIssueDetID = ProdIssueDetId,
                //            Unit_Or_Other = "O",
                //        });
                //    }
                //}

                foreach (var proditemstckoutlst in ProdIssstockoutwardList)
                {
                    entities.Item_stock_outward.Add(proditemstckoutlst);
                }
                entities.SaveChanges();

                // Update IssueQty in Prod_Ord_Det Begin
                var ProdOrddetList = new List<Prod_Ord_Det>();

                foreach (var prod in objProdIssDet)
                {
                    var prodordqty = entities.Prod_Ord_Det.Where(c => c.ProductionId == prod.ProdIssueId && c.itemid == prod.ItemId &&
                        c.sizeid == prod.SizeId && c.colorid == prod.ColorId).FirstOrDefault();

                    if (prodordqty != null)
                    {
                        prodordqty.issued_qty = prodordqty.issued_qty + prod.IssueQty;
                        prodordqty.Markup_Rate = (((prodordqty.issued_qty * (prodordqty.Markup_Rate == null ? 0 : prodordqty.Markup_Rate)) +
                            (prod.IssueQty * prod.IPMarkupRate)) / (prodordqty.issued_qty + prod.IssueQty));
                        //ProdOrddetList.Add(new Repository.Prod_Ord_Det
                        //{
                        //    issued_qty = prodordqty.issued_qty + prod.IssueQty,
                        //    Markup_Rate = (((prodordqty.issued_qty * (prodordqty.Markup_Rate == null ? 0 : prodordqty.Markup_Rate)) +
                        //    (prod.IssueQty * prod.IPMarkupRate)) / (prodordqty.issued_qty + prod.IssueQty))
                        //});
                    }
                }

                entities.SaveChanges();
                // Update OrderQty in Prod_prg_Det End

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public bool AddItemStockOutward()
        //{
        //    try
        //    {
        //        var ProdIssstockoutwardList = new List<Item_stock_outward>();

        //        foreach (var itemstckout in ProdIssueMas.ProdIssueStck)
        //        {
        //            if (itemstckout.Issues > 0)
        //            {
        //                ProdIssstockoutwardList.Add(new Repository.Item_stock_outward
        //                {
        //                    Itemstockid = itemstckout.StockId,
        //                    outwarddate = ProdIssueMas.ProdIssueDate,
        //                    TransNo = ProdIssueMas.ProdIssueNo,
        //                    TransType = "CIS",
        //                    Quantity = itemstckout.Issues,
        //                    joborderno = itemstckout.JobOrdNo,
        //                    ProdIssueDetID = ProdIssueDetId,
        //                    Unit_Or_Other = "O",
        //                });
        //            }
        //        }

        //        foreach (var proditemstckoutlst in ProdIssstockoutwardList)
        //        {
        //            entities.Item_stock_outward.Add(proditemstckoutlst);
        //        }
        //        entities.SaveChanges();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public bool AddProductionIssueJobDet(List<ProductionIssueJobDet> objProdIssJobDet, string Mode)
        {
            try
            {
                if (Mode == "Update")
                {
                    //foreach (var item in objShipDet)
                    //{
                    //    styleid = item.StyleId;
                    //}
                    ////delete StyleDetail Many Rows table
                    //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                    //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
                    //entities.SaveChanges();
                }

                var ProdIssjobdetList = new List<Prod_iss_JobDet>();

                foreach (var item in objProdIssJobDet)
                {
                    var prodissdet = entities.Prod_iss_det.Where(c => c.itemid == item.ItemId && c.colorid == item.ColorId &&
                        c.sizeid == item.SizeId && c.ProdIssueId == item.ProdIssueId).FirstOrDefault();

                    if (prodissdet != null)
                    {
                        //entities.Job_Ord_Det.Add(item);
                        ProdIssjobdetList.Add(new Repository.Prod_iss_JobDet
                        {
                            ProdIssueId = item.ProdIssueId,
                            ProdIssueDetId = prodissdet.ProdIssueDetId,
                            Job_ord_no = item.JobOrdNo,
                            ProdPrgNo = item.ProdPrgNo,
                            LastProcessid = item.LastProcessId,
                            IssueQty = item.IssQty,
                            ItemId = item.ItemId,
                            ColorId = item.ColorId,
                            SizeId = item.SizeId
                        });
                    }

                    var prodprgmas = entities.Prod_Prg_Mas.Where(c => c.ProdPrgNo == item.ProdPrgNo).FirstOrDefault();
                    if (prodprgmas != null)
                    {
                        //var prodprgdet = entities.Prod_Prg_Det.Where(c => c.Itemid == item.ItemId && c.Colorid == item.ColorId &&
                        //c.Sizeid == item.SizeId && c.Prodprgid == prodprgmas.ProdPrgid).FirstOrDefault();
                        var prodprgdet = entities.Prod_Prg_Det.Where(c => c.Itemid == item.ItemId && c.Colorid == item.ColorId &&
                        c.Sizeid == item.SizeId && c.Prodprgid == prodprgmas.ProdPrgid && c.InorOut == "I").ToList();

                        if (prodprgdet != null)
                        {
                            foreach (var proprgdet in prodprgdet)
                            {
                                proprgdet.order_qty = (proprgdet.order_qty + item.IssQty);
                                proprgdet.Issue_qty = (proprgdet.Issue_qty + item.IssQty);
                            }
                        }

                        var prodprgdetOut = entities.Prod_Prg_Det.Where(c => c.Itemid == item.ItemId && c.Colorid == item.ColorId &&
                       c.Sizeid == item.SizeId && c.Prodprgid == prodprgmas.ProdPrgid && c.InorOut == "O").ToList();

                        if (prodprgdetOut != null)
                        {
                            foreach (var proprgdetO in prodprgdetOut)
                            {
                                proprgdetO.order_qty = (proprgdetO.order_qty + item.IssQty);
                               
                            }
                        }


                        //if (prodprgdet != null)
                        //{
                        //    prodprgdet.order_qty=item.IssQty;
                        //    prodprgdet.Issue_qty = item.IssQty;
                        //}
                    }
                }

                foreach (var prodissjobdetlst in ProdIssjobdetList)
                {
                    entities.Prod_iss_JobDet.Add(prodissjobdetlst);
                }

                entities.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddProductionIssueStck(List<ProductionIssueStock> objProdIssStck, string Mode)
        {
            try
            {
                if (Mode == "Update")
                {
                    //foreach (var item in objShipDet)
                    //{
                    //    styleid = item.StyleId;
                    //}
                    ////delete StyleDetail Many Rows table
                    //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                    //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
                    //entities.SaveChanges();
                }

                var ProdIssStckList = new List<Prod_Iss_Stock>();
                var ItemStckList = new List<ItemStock>();

                foreach (var item in objProdIssStck)
                {
                    var prodissjobdet = entities.Prod_iss_JobDet.Where(c => c.ItemId == item.ItemId && c.ColorId == item.ColorId &&
                        c.SizeId == item.SizeId && c.ProdIssueId == item.ProdIssueId).FirstOrDefault();

                    if (prodissjobdet != null)
                    {
                        ProdIssStckList.Add(new Repository.Prod_Iss_Stock
                        {
                            ItemStockId = item.StockId,
                            ProdIssueJobid = prodissjobdet.ProdIssueJobId,
                            IssueQty = item.Issues,
                            ReturnQty = 0,
                            Returnable_Qty = 0,
                            Markup_Rate = 0,
                            Itemid = item.ItemId,
                            Colorid = item.ColorId,
                            Sizeid = item.SizeId,
                           // ProdPrgNo=item.ProdPrgNo
                        });
                    }
                }

                foreach (var prodissStcklst in ProdIssStckList)
                {
                    entities.Prod_Iss_Stock.Add(prodissStcklst);
                }

                entities.SaveChanges();

                // Update Alloted and BalQty in ItemStock Begin
                var ProdOrddetList = new List<Prod_Ord_Det>();

                foreach (var prod in objProdIssStck)
                {
                    var AllBalqty = entities.ItemStock.Where(c => c.StockId == prod.StockId).FirstOrDefault();

                    if (AllBalqty != null)
                    {
                        decimal AllotedQty = (Convert.ToDecimal(AllBalqty.alloted) + prod.Issues);
                        decimal BalQty = (Convert.ToDecimal(AllBalqty.balQty) - prod.Issues);

                        AllBalqty.alloted = AllotedQty;
                        AllBalqty.balQty = BalQty;
                        //ItemStckList.Add(new Repository.ItemStock
                        //{
                        //    alloted = AllotedQty ,
                        //    balQty = BalQty,
                        //});
                    }
                }

                entities.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IList<ProductionMainGridDetails> GetMainData(int ID, string FromDate, string ToDate, string OrderType, int ProcessId, int UnitId, int IssId, string Refno, string JobOrdNo, string OrdNo, string ProcessorType)
        {
            var query = (from a in entities.Proc_Apparel_ProcessIssueMainList(ID, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), OrderType, JobOrdNo, Refno, ProcessId, UnitId, IssId, OrdNo, ProcessorType)
                         select new ProductionMainGridDetails
                         {
                             ProdIssueDate = (DateTime)a.ProdIssuedate,
                             ProdIssueNo = a.ProdIssueNo,
                             ProdIssueId = a.ProdIssueId,
                             ProcessId = a.Processid,
                             Process = a.Process,
                             Company = a.Company,
                             CompanyId = a.companyid,
                             CompanyUnitId = a.Id,
                             CompanyUnit = a.Companyunit,
                             SupplierId = (int)a.supplierid,
                             OrderType = a.OrderType,
                             RefNo = a.Ref_No,
                             JobOrdNo = a.Job_ord_no,
                             OrdNo = a.Order_No,
                             ProcessorType = a.Company,
                             //ProdOrderId=(int)a.ProductionOrdId,
                             //ProcessOrder=a.Prodorder,
                             //WorkDivision = a.WorkDivision,
                             Supplier = a.supplier,
                             BuyerId=(int)a.BuyerId,
                             Buyer=a.Buyer
                         }).AsQueryable();

            return query.ToList();
            //throw new NotImplementedException();
        }

        public bool UpdateData(Prod_iss_mas objUpd, List<Prod_iss_det> objdet, List<Prod_iss_JobDet> objobdet, List<Prod_Iss_Stock> objstk,List<CommonProductionStckDet> ProdIssueStck)
        {


            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {



                    var Upd = entities.Prod_iss_mas.Where(c => c.ProdIssueId == objUpd.ProdIssueId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.ProdIssueDate = objUpd.ProdIssueDate;
                        Upd.Remarks = objUpd.Remarks;
                        Upd.GatePassVehicle = objUpd.GatePassVehicle;
                        Upd.LastProcessId = objUpd.LastProcessId;


                        entities.SaveChanges();

                    }

                    int id = 0;
                    var detid = 0;
                    var odetid = 0;

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var jdet in objobdet)
                        {

                            var Py = entities.proc_Apparel_CommonUpdateProdprgdetInput(jdet.ProdIssueId, jdet.ProdPrgNo, jdet.Job_ord_no, jdet.ItemId, jdet.ColorId, jdet.SizeId);
                            entities.SaveChanges();


                        }
                    }

                    if (objstk != null && objstk.Count > 0)
                    {
                        foreach (var it in objstk)
                        {
                            var Py = entities.Proc_Apparel_CommonOrderItmStkUpdate(it.ItemStockId, it.ProdIssStockId);
                            entities.SaveChanges();
                        }

                        foreach (var stkdet in objstk)
                        {
                            var Py = entities.Proc_Apparel_CommonDelitmstkOutwrd(stkdet.ItemStockId, objUpd.ProdIssueNo, stkdet.LotNo);
                            entities.SaveChanges();
                        }
                    }


                    //var deletedetstk = entities.Prod_Iss_Stock.Where(d => d.ProdIssStockId == id).ToList<Prod_Iss_Stock>();

                    //deletedetstk.ForEach(c => entities.Prod_Iss_Stock.Remove(c));
                    //entities.SaveChanges();



                    //var deletedetob = entities.Prod_iss_JobDet.Where(d => d.ProdIssueId == id).ToList<Prod_iss_JobDet>();

                    //deletedetob.ForEach(c => entities.Prod_iss_JobDet.Remove(c));
                    //entities.SaveChanges();



                    var dy = entities.Prod_iss_det.Where(c => c.ProdIssueId == objUpd.ProdIssueId);

                    foreach (var dbSet in dy)
                    {
                        int YPMID = (int)dbSet.ProdIssueId;

                        var Det = entities.Prod_iss_JobDet.Where(u => u.ProdIssueId == YPMID);

                        foreach (var u in Det)
                        {
                            int YPJDID = u.ProdIssueJobId;
                            var Det1 = entities.Prod_Iss_Stock.Where(v => v.ProdIssueJobid == YPJDID);

                            foreach (var v in Det1)
                            {

                                entities.Prod_Iss_Stock.Remove(v);

                            }
                            var Det2 = entities.Prod_iss_JobDet.Where(w => w.ProdIssueJobId == YPJDID);
                            foreach (var w in Det2)
                            {

                                entities.Prod_iss_JobDet.Remove(w);

                            }


                        }


                    }


                    entities.SaveChanges();

                    var deletedet = entities.Prod_iss_det.Where(d => d.ProdIssueId == objUpd.ProdIssueId).ToList<Prod_iss_det>();

                    deletedet.ForEach(c => entities.Prod_iss_det.Remove(c));
                    entities.SaveChanges();



                    if (ProdIssueStck.Count > 0)
                    {
                        foreach (var itemstck in ProdIssueStck)
                        {
                            if (itemstck.Issues > 0)
                            {
                                var mrupdate = entities.ItemStock.Where(a => a.StockId == itemstck.StockId).FirstOrDefault();
                                mrupdate.Markup_Rate = itemstck.MarkupRate;
                                entities.SaveChanges();

                            }
                        }
                    }



                    var masid = 0;
                    //Insert

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.IssueQty > 0)
                            {

                                entities.Prod_iss_det.Add(item);
                                entities.SaveChanges();
                                detid = item.ProdIssueDetId;
                                masid = (int)item.ProdIssueId;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.IssueQty > 0)
                                    {
                                        if (item.itemid == jobdt.ItemId && item.colorid == jobdt.ColorId && item.sizeid == jobdt.SizeId)
                                        {

                                            jobdt.ProdIssueDetId = detid;
                                            entities.Prod_iss_JobDet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProdIssueJobId;

                                            foreach (var stkdet in objstk)
                                            {
                                                if (stkdet.IssueQty > 0)
                                                {
                                                    if (jobdt.ItemId == stkdet.Itemid && jobdt.ColorId == stkdet.Colorid && jobdt.SizeId == stkdet.Sizeid)
                                                    {

                                                        stkdet.ProdIssueJobid = odetid;
                                                        entities.Prod_Iss_Stock.Add(stkdet);

                                                    }
                                                }

                                            }

                                        }
                                    }
                                    // }
                                }
                                entities.SaveChanges();

                            }
                        }

                    }


                    foreach (var jobdt in objobdet)
                    {
                        if (jobdt.IssueQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_CommonProdDetInputUpdate(jobdt.ProdPrgNo, jobdt.Job_ord_no, jobdt.ProdIssueId, jobdt.ItemId, jobdt.ColorId, jobdt.SizeId);
                            entities.SaveChanges();
                        }


                    }


                    foreach (var stkdet in objstk)
                    {
                        if (stkdet.IssueQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_CommonAddOrderItmStkUpdate(stkdet.IssueQty, stkdet.ItemStockId);
                            entities.SaveChanges();

                            var Ins = entities.Proc_Apparel_CommonInsertstkoutward(stkdet.ProdIssueJobid, stkdet.ItemStockId, stkdet.IssueQty, stkdet.ProdIssStockId);
                            entities.SaveChanges();
                        }
                    }


                    var MarkUpRate = UpdateMarkUpRate(objUpd.ProdIssueId);


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionOrder-UpdDetData");
                }
            }
            return reserved;

        }

        public bool DeleteCPIssue(Prod_iss_mas objDpd, List<Prod_iss_det> objDdet, List<Prod_iss_JobDet> objDobdet, List<Prod_Iss_Stock> objDstk)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    
                    var Upd = entities.Prod_iss_mas.Where(c => c.ProdIssueId == objDpd.ProdIssueId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.ProdIssueDate = objDpd.ProdIssueDate;
                        Upd.Remarks = objDpd.Remarks;
                        Upd.GatePassVehicle = objDpd.GatePassVehicle;
                        Upd.LastProcessId = objDpd.LastProcessId;


                        entities.SaveChanges();

                    }

                
                    if (objDobdet != null && objDobdet.Count > 0)
                    {
                        foreach (var jdet in objDobdet)
                        {

                            var Py = entities.proc_Apparel_CommonUpdateProdprgdetInput(jdet.ProdIssueId, jdet.ProdPrgNo, jdet.Job_ord_no, jdet.ItemId, jdet.ColorId, jdet.SizeId);
                            entities.SaveChanges();


                        }
                    }

                    if (objDstk != null && objDstk.Count > 0)
                    {
                        foreach (var it in objDstk)
                        {
                            var Py = entities.Proc_Apparel_CommonOrderItmStkUpdate(it.ItemStockId, it.ProdIssStockId);
                            entities.SaveChanges();
                        }

                        foreach (var stkdet in objDstk)
                        {
                            var Py = entities.Proc_Apparel_CommonDelitmstkOutwrd(stkdet.ItemStockId, objDpd.ProdIssueNo, stkdet.LotNo);
                            entities.SaveChanges();
                        }
                    }




                    var dy = entities.Prod_iss_det.Where(c => c.ProdIssueId == objDpd.ProdIssueId);

                    foreach (var dbSet in dy)
                    {
                        int YPMID = (int)dbSet.ProdIssueId;

                        var Det = entities.Prod_iss_JobDet.Where(u => u.ProdIssueId == YPMID);

                        foreach (var u in Det)
                        {
                            int YPJDID = u.ProdIssueJobId;
                            var Det1 = entities.Prod_Iss_Stock.Where(v => v.ProdIssueJobid == YPJDID);

                            foreach (var v in Det1)
                            {

                                entities.Prod_Iss_Stock.Remove(v);

                            }
                            var Det2 = entities.Prod_iss_JobDet.Where(w => w.ProdIssueJobId == YPJDID);
                            foreach (var w in Det2)
                            {

                                entities.Prod_iss_JobDet.Remove(w);

                            }


                        }


                    }


                    entities.SaveChanges();

                    var deletedet = entities.Prod_iss_det.Where(d => d.ProdIssueId == objDpd.ProdIssueId).ToList<Prod_iss_det>();

                    deletedet.ForEach(c => entities.Prod_iss_det.Remove(c));
                    entities.SaveChanges();

                    var deletedet1 = entities.Prod_iss_mas.Where(d => d.ProdIssueId == objDpd.ProdIssueId).ToList<Prod_iss_mas>();

                    deletedet1.ForEach(c => entities.Prod_iss_mas.Remove(c));
                    entities.SaveChanges();
                           


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionOrder-UpdDetData");
                }
            }
            return reserved;

        }

        //public IQueryable<CommonProductionIssue> GetCommonProductionIssueCompDetails(int CompanyId, int CompanyUnitId, int ProcessId, string Ordertype, string ProcessType)
        //{
        //   IQueryable<CommonProductionIssue> query = (from T in entities.Proc_Apparel_GetCommonProductionIssueDet(CompanyId, CompanyUnitId, ProcessId, ProcessType, Ordertype)
        //                                              select new CommonProductionIssue
        //                                              {
        //                                                  ProdPrgId = T.prodprgid,
        //                                                  ProdPrgramNo = T.ProdPrgNo,
        //                                                  ProdProgramDate = (DateTime)T.ProgDate,
        //                                                  JobOrdNo = T.Job_ord_no,
        //                                                  CompanyUnit = T.companyunit,
        //                                                  ProcessId = (int)T.ProcessId,
        //                                                  Process = T.Process,
        //                                                  Buyer = T.Buyer
        //                                              }).AsQueryable();
        //   return query;
        //}
    }
}
