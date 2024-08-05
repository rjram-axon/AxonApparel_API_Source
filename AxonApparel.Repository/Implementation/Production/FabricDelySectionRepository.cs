using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Data.Entity;

namespace AxonApparel.Repository
{
    public class FabricDelySectionRepository : IFabricDelySectionRepository
    {
        ProductionEntities entities = new ProductionEntities();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IQueryable<FabricDelySection> GetFaricDelySectionOrderList(int CompanyId, int CompanyUnitId, string OrderType, string refno, int styleid, string ordo, int Buyerid)
        {
            IQueryable<FabricDelySection> query = (from T in entities.proc_Apparel_FabricDelyOrderAddlistingforBulk(CompanyId, CompanyUnitId, OrderType, refno, styleid, ordo, Buyerid)
                                                   select new FabricDelySection
                                              {
                                                  BuyOrdMasId = T.Buy_Ord_MasId,
                                                  Style = T.Style,
                                                  RefNo = T.Ref_No,
                                                  OrderNo = T.Order_No,
                                                  Qty = (decimal)T.Quantity,
                                                  WorkOrder = T.JobNo,
                                                  ProdPrgNo = T.ProdPrgNo,
                                                  ProdPrgId = T.ProdPrgId,
                                                  ProcessId = (int)T.ProcessId,
                                                  Process=T.Process
                                              }).AsQueryable();

            return query;
        }

        public IList<FabricDelySection> GetInputOutputDetails(int Prodprgid, string JobOrdNo, string Ordertype)
        {
            IQueryable<FabricDelySection> queryColor = (from T in entities.Proc_Apparel_GetFabricDelySectionDetailForAdd(Prodprgid, JobOrdNo, Ordertype)
                                                        select new FabricDelySection
                                                        {
                                                            Sno = (int)T.Sno,
                                                            StockId = (int)T.StockId,
                                                            ProdPrgId = T.prodprgdetid,
                                                            Item = T.Item,
                                                            ItemId = (int)T.ItemId,
                                                            Color = T.Color,
                                                            ColorId = T.ColorId,
                                                            Size = T.Size,
                                                            SizeId = T.SizeId,
                                                            BUomId = (int)T.BUomId,
                                                            BaseUnit = T.Bas_Unit,
                                                            SUomId = (int)T.SUomId,
                                                            SecUnit = T.Sec_Unit,
                                                            InorOut = T.InOrOut,
                                                            ProcessId = (int)T.ProcessId,
                                                            ProdprgQty = (decimal)T.Prog_Op_Qty,
                                                            BalQty = (decimal)T.Bal_Qty,
                                                            ordqty = T.ordqty,
                                                            issqty = T.issqty,
                                                            secqty = T.secqty,
                                                            apprate = (decimal)T.Apprate,
                                                            rate = (decimal)T.Apprate,
                                                            weight = T.weight,
                                                            Grammage = T.Grammage,
                                                            CuttingOrdDetId = 0,
                                                            AllowBalQty = (decimal)T.Bal_Qty,
                                                            receivedqty = (decimal)T.receivedqty,
                                                            ReturnQty = (decimal)T.ReturnQty,

                                                        }).AsQueryable();

            return queryColor.ToList();
        }

        public IQueryable<CuttingOrderStockProperties> GetItemStockInfo(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId)
        {
            IQueryable<CuttingOrderStockProperties> query = (from T in entities.Proc_Apparel_FabricDelyInputItemStock(JobOrdNo, IssueStoreId, StyleId, ItemId, ColorId, SizeId, CompanyId)
                                                             select new CuttingOrderStockProperties
                                                             {
                                                                 LotNo = T.LotNo,
                                                                 TransNo = T.Transno,
                                                                 TransDate = T.Transdate,
                                                                 Process = T.Process,
                                                                 Processid = T.Processid,
                                                                 Supplier = T.Supplier,
                                                                 Supplierid = T.SupplierId,
                                                                 Stockid = T.StockId,
                                                                 Rate = (decimal)T.Rate,
                                                                 MRate = (decimal)T.MRate,
                                                                 ItemId = (int)T.ItemId,
                                                                 ColorId = (int)T.ColorId,
                                                                 SizeId = (int)T.SizeId,
                                                                 BalQty = (decimal)T.BalQty,
                                                                 StockQty = (decimal)T.BalQty,
                                                                 AllotedQty = 0,
                                                                 receivedqty = (decimal)T.receivedqty,
                                                                 ReturnQty = (decimal)T.returnQty,
                                                             }).AsQueryable();
            return query;
        }

        public IQueryable<FabricDelyStockProperties> GetFabricItemStockInfoEditMode(int FabDelyIssueId, int ItemID, int ColorID, int SizeID)
        {

            IQueryable<FabricDelyStockProperties> query = (from T in entities.Proc_Apparel_FabricIssueStockkDetailsEditMode(FabDelyIssueId, ItemID, ColorID, SizeID)  //Proc_Apparel_FabricIssueStkDetails
                                                           select new FabricDelyStockProperties
                                                             {
                                                                FabDelyIssueId = FabDelyIssueId,
                                                                FabDelyIssueDetId = T.Detid,
                                                                FabDelyIssueStockId = T.IssStkid,
                                                                 LotNo = T.lotno,
                                                                 TransNo = T.Transno,
                                                                 TransDate = (DateTime)T.Transdate,
                                                                 Process = T.Process,
                                                                 Processid = T.Processid,
                                                                 Supplier = T.Supplier,
                                                                 IssStkid = 0, //T.IssStkid,
                                                                 itemstckid = 0,  //T.itemstckid,
                                                                 Supplierid = T.Supplierid,
                                                                 Stockid = (int)T.Stockid,
                                                                 Rate = (decimal)T.Rate,
                                                                 MRate = (decimal)T.Mrate,
                                                                 ItemId = (int)T.ItemId,
                                                                 ColorId = (int)T.ColorId,
                                                                 SizeId = (int)T.SizeId,
                                                                 BalQty = (decimal)T.IssueQty,
                                                                 StockQty = (decimal)(T.StkQty +T.IssueQty),
                                                                 AllotedQty = (decimal)T.IssueQty,
                                                                 receivedqty = (decimal)T.receivedqty,
                                                                 ReturnQty = (decimal)T.returnQty,
                                                             }).AsQueryable();
            return query;
        }       

        public IEnumerable<Domain.FabricDelySection> GetMainData(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string cuttingordno, string jobordno, string FromDate, string ToDate, int supplierid)
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<Domain.FabricDelySection> lstmain = new List<Domain.FabricDelySection>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("proc_Apparel_GetFabricDelyIssueDetailsForJobMaingrid", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = compid;
                cmd.Parameters.Add("@unitid", SqlDbType.Int).Value = unitid;
                cmd.Parameters.Add("@BuyerId", SqlDbType.Int).Value = buyerid;
                cmd.Parameters.Add("@masid", SqlDbType.Int).Value = masid;
                cmd.Parameters.Add("@Empid", SqlDbType.Int).Value = empid;
                cmd.Parameters.Add("@OrdNo", SqlDbType.VarChar, 25).Value = orderno;
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 25).Value = refno;
                cmd.Parameters.Add("@Supptype", SqlDbType.Char, 1).Value = supptype;
                cmd.Parameters.Add("@Ordtype", SqlDbType.Char, 1).Value = ordtype;
                cmd.Parameters.Add("@JobOrdNo", SqlDbType.VarChar, 25).Value = jobordno;
                cmd.Parameters.Add("@CuttingOrdNo", SqlDbType.VarChar, 25).Value = cuttingordno;
                cmd.Parameters.Add("@supplierid", SqlDbType.Int).Value = supplierid;
                cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 25).Value = FromDate;
                cmd.Parameters.Add("@Todate", SqlDbType.VarChar, 25).Value = ToDate;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.FabricDelySection main = new Domain.FabricDelySection();

                    main.FabDelyIssueId = Convert.ToInt32(rdr["FabDelyIssueId"]);
                    main.OrderNo = rdr["Order_no"].ToString();
                    main.RefNo = rdr["Ref_No"].ToString();
                    main.FabDelyIssueNo = rdr["FabDelyIssueNo"].ToString();

                  //  main.FabDelyIssueDate = (DateTime)rdr["Cutdate"];
                    main.StrFabDelyIssueDate = rdr["Cutdate"].ToString();

                    main.WorkDivision = rdr["workdivision"].ToString();
                    main.Incharger = rdr["Employee"].ToString();
                    main.ProdPrgId = Convert.ToInt32(rdr["ProdPrgid"]);
                    main.ChkRecpt = Convert.ToInt32(rdr["ChkRecpt"]);

                    main.WorkOrder = rdr["joborderno"].ToString();
                    main.InchargerId = Convert.ToInt32(rdr["Employeeid"]);
                    main.company = rdr["Company"].ToString();
                    main.CompanyId = Convert.ToInt32(rdr["Companyid"]);
                    main.CompanyUnitId = Convert.ToInt32(rdr["Companyunitid"]);
                    main.Supplier = rdr["unit"].ToString();
                    main.SupplierId = Convert.ToInt32(rdr["unitid"]);
                    main.EmployeeId = Convert.ToInt32(rdr["Employeeid"]);
                    main.BuyerId = Convert.ToInt32(rdr["buyerid"]);
                    main.Buyer = rdr["Buyer"].ToString();
                    main.InorOut = rdr["InternalorExternal"].ToString();
                    main.OrderType = rdr["OrderType"].ToString();
                    main.BuyOrdMasId = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
                    main.jmasid = Convert.ToInt32(rdr["ID"]);

                    main.ProdPrgNo = rdr["ProdPrgNo"].ToString();

                    lstmain.Add(main);
                }
                con.Close();
            }
            return lstmain;
        }

        public IQueryable<FabricDelySection> GetFabricHeaderInfo(int FabricDelyIssueId)
        {
            IQueryable<FabricDelySection> query = (from T in entities.Proc_Apparel_FabricDelyIssueLoadDetails(FabricDelyIssueId)
                                                   select new FabricDelySection
                                              {
                                                  CompanyId = (int)T.Companyid,
                                                  BuyerId = (int)T.Buyerid,
                                                  CompanyUnitId = (int)T.CompanyUnitid,
                                                  FabDelyIssueNo = T.FabDelyIssueNo,
                                                  FabDelyIssueDate = (DateTime)T.FabDelyIssueDate,
                                                  //     DeliverDate = (DateTime)T.DeliveryDate,
                                                  EmployeeId = (int)T.Employeeid,
                                                  Remarks = T.Remarks,
                                                  WorkDivisionId = (int)T.WorkDivisionid,
                                                  WorkDivision = T.workdivision,
                                                  //  LossPer = (int)T.LossPer,
                                                  //    OrderCumIssue = T.OrderCumIssue,
                                                  OrderNo = T.OrderNo,
                                                  RefNo = T.RefNo,
                                                  InterExter = T.internalorexternal,
                                                  StyleId = (int)T.Styleid,
                                                  ProdPrgNo = T.ProdPrgNo,
                                                  ProdPrgId = T.Prodprgid,
                                                  WorkOrder = T.JobOrderNo,
                                                  OrderType = T.OrderType,
                                                  ProcessId = (int)T.ProcessId1,
                                                  StoreType = T.StoreType,
                                                  StoreName = T.StoreName,
                                                  StoreUnitID = (int)T.StoreUnitID,
                                                  ParentUnitid = (int)T.ParentUnitid
                                              }).AsQueryable();
            return query;
        }

        public IList<FabricDelySection> GetInputOutputEdit(int FabricDelyIssueId, int Prodprgid)
        {
            IQueryable<FabricDelySection> queryColor = (from T in entities.Proc_Apparel_FabricDelyIssueDetLoadDetails_EditMode(FabricDelyIssueId, Prodprgid)  //Proc_Apparel_FabricDelyIssueDetLoadDetails
                                                        select new FabricDelySection
                                                   {
                                                       Sno = (int)T.Sno,
                                                       //StockId = (int)T.StockId,
                                                       FabDelyIssueId = FabricDelyIssueId,
                                                       FabDelyIssueDetId = T.CuttingIssueDetid,
                                                       ProdPrgId = T.prodprgdetid,
                                                       Item = T.Item,
                                                       ItemId = (int)T.ItemId,
                                                       Color = T.Color,
                                                       ColorId = (int)T.ColorId,
                                                       Size = T.Size,
                                                       SizeId = (int)T.SizeId,
                                                       //BUomId = (int)T.BUomId,
                                                       //BaseUnit = T.Bas_Unit,
                                                       //SUomId = (int)T.SUomId,
                                                       //SecUnit = T.Sec_Unit,
                                                       InorOut = T.InorOut,
                                                       //ProcessId = (int)T.ProcessId,
                                                       ProdprgQty = (decimal)T.Prog_Op_Qty,
                                                       BalQty = (decimal)T.Bal_Qty, //((decimal)T.Bal_Qty + (decimal)T.IssueQty),
                                                       StockQty = (decimal)T.Bal_Qty,
                                                       ordqty = (decimal)T.ordqty,
                                                       issqty = (decimal)T.IssueQty,
                                                       secqty = (decimal)T.secqty,
                                                       apprate = (decimal)T.rate,
                                                       rate = (decimal)T.rate,
                                                       weight = T.Weight,
                                                       Grammage = (decimal)T.Grammage,
                                                       AllowBalQty = ((decimal)T.Bal_Qty + (decimal)T.IssueQty),

                                                       receivedqty = (decimal)T.ReceivedQty,
                                                       ReturnQty = (decimal)T.ReturnQty,
                                                       Oldissqty = (decimal)T.IssueQty,
                                                   }).AsQueryable();

            return queryColor.ToList();
        }       

        public bool AddData1(FabDelySec_Issue_Mas obj, List<FabDelySec_Issue_Det> objdet, List<FabDelySec_Issue_Stock> objstock, Domain.FabricDelySection_Mas FabDelySecAdd)
        {
            bool reserved = false;
            int MasId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var detid = 0;
                    var stockid = 0;

                    entities.FabDelySec_Issue_Mas.Add(obj);
                    entities.SaveChanges();
                    MasId = obj.FabDelyIssueId;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            item.FabDelyIssueId = MasId;
                            entities.FabDelySec_Issue_Det.Add(item);
                            entities.SaveChanges();
                            detid = item.FabDelyIssueDetId;

                            var Prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgid == obj.ProdPrgid && c.Itemid == item.itemid && c.Colorid == item.colorid && c.Sizeid == item.sizeid).FirstOrDefault();
                            if (Prodprgdet != null)
                            {
                                Prodprgdet.Dely_Qty =  Prodprgdet.Dely_Qty +item.IssueQty;

                                entities.SaveChanges();
                            }
                        }
                    }                   

                    var ItmListStock = new List<FabDelySec_Issue_Stock>();

                    foreach (var PItem in FabDelySecAdd.FabricDelySectionStock)
                    {
                        if (PItem.AllotedQty > 0)
                        {
                            var FabDelyIssueDetId = entities.FabDelySec_Issue_Det.Where(c => c.itemid == PItem.ItemId && c.FabDelyIssueId == obj.FabDelyIssueId
                                                            && c.colorid == PItem.ColorId && c.sizeid == PItem.SizeId).Select(d => d.FabDelyIssueDetId).First();

                            ItmListStock.Add(new FabDelySec_Issue_Stock
                            {
                                // FabDelyIssueStockId = PItem.FabDelyIssueStockId,
                                FabDelyIssueDetId = (FabDelyIssueDetId == null ? 0 : FabDelyIssueDetId),
                                FabDelyIssueId = obj.FabDelyIssueId,
                                StockId = PItem.StockId,
                                IssueQty = PItem.AllotedQty,
                                ReturnQty = PItem.ReturnQty,  //0
                                LossQty = PItem.LossQty,       //0
                                Markup_rate = PItem.MarkupRate,  //0
                            });

                            var mrupdate = entities.ItemStock.Where(a => a.StockId == PItem.StockId).FirstOrDefault();
                            mrupdate.Markup_Rate = PItem.MarkupRate;
                            entities.SaveChanges();
                        }
                    }

                    foreach (var issuelst in ItmListStock)
                    {
                        entities.FabDelySec_Issue_Stock.Add(issuelst);
                    }

                    entities.SaveChanges();

                    var ItmListStock_Outward = new List<ProductionItem_stock_outward>();

                    foreach (var PItem in FabDelySecAdd.FabricDelySectionStock)  //.TemplateDet
                    {
                        if (PItem.AllotedQty > 0)
                        {
                            var FabDelyIssueDetId = entities.FabDelySec_Issue_Det.Where(c => c.itemid == PItem.ItemId && c.FabDelyIssueId == MasId
                                                            && c.colorid == PItem.ColorId && c.sizeid == PItem.SizeId).Select(d => d.FabDelyIssueDetId).First();

                            ItmListStock_Outward.Add(new ProductionItem_stock_outward
                            {
                                Itemstockid = PItem.StockId,
                                Unitid = FabDelySecAdd.CompanyUnitId,
                                outwarddate = FabDelySecAdd.FabDelyIssueDate,
                                TransNo = FabDelySecAdd.FabDelyIssueNo,
                                TransType = "FDL",
                                Quantity = PItem.AllotedQty,
                                joborderno = FabDelySecAdd.Joborderno,
                                Unit_Or_Other = "O",
                                ProdIssueDetID = (FabDelyIssueDetId == 0 ? 0 : FabDelyIssueDetId),
                            });
                        }
                    }

                    foreach (var issuelst in ItmListStock_Outward)
                    {
                        entities.Item_stock_outward.Add(issuelst);
                    }

                    entities.SaveChanges();                   

                    foreach (var stk in FabDelySecAdd.FabricDelySectionStock)
                    {
                        if (stk.AllotedQty > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_UpdateItemStock(stk.StockId, stk.AllotedQty, stk.AllotedQty);                           
                            entities.SaveChanges();
                        }
                    }

                    entities.SaveChanges();

                    //Update MarkUpRate
                    bool UCMR = MarkUpRateUpdation_Fabric(MasId);

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    //  exceplogg.SendExcepToDB(ex, "ProcessOrder-AddDetData");
                }
            }
            return reserved;
        }

        public bool MarkUpRateUpdation_Fabric(int FabDelyIssueId)
        {
            var upd = entities.Proc_Apparel_UpdateFabricDelyMarkUpRate(FabDelyIssueId);
            return true;
        }

        public bool UpdDetData(FabDelySec_Issue_Mas obj, List<FabDelySec_Issue_Det> objdet, List<FabDelySec_Issue_Stock> objstock, Domain.FabricDelySection_Mas FabDelySecAdd)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var Upd = entities.FabDelySec_Issue_Mas.Where(c => c.FabDelyIssueId == obj.FabDelyIssueId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.FabDelyIssueId = obj.FabDelyIssueId;
                        Upd.FabDelyIssueNo = obj.FabDelyIssueNo;
                        Upd.FabDelyIssueDate = obj.FabDelyIssueDate;
                        Upd.Joborderno = obj.Joborderno;
                        Upd.Employeeid = obj.Employeeid;
                        Upd.Remarks = obj.Remarks;
                        Upd.companyunitid = obj.companyunitid;
                        Upd.Companyid = obj.Companyid;
                        Upd.internalorexternal = obj.internalorexternal;
                        Upd.OrderType = obj.OrderType;
                        Upd.WorkDivisionid = obj.WorkDivisionid;
                        Upd.ProdPrgid = obj.ProdPrgid;
                        Upd.FromStoreid = obj.FromStoreid;
                        Upd.CreatedBy = obj.CreatedBy;
                        Upd.FLineId = obj.FLineId;
                        Upd.IsApproved = obj.IsApproved;
                        //ApprovedBy = FabDelySecAdd.ApprovedBy,
                        //ApprovedDate = FabDelySecAdd.ApprovedDate,
                        //VehicleNo = FabDelySecAdd.VehicleNo,

                        entities.SaveChanges();
                    }

                    var det = entities.FabDelySec_Issue_Det.Where(c => c.FabDelyIssueId == obj.FabDelyIssueId).ToList();
                    if (det != null && det.Count > 0)
                    {
                        foreach (var item in det)
                        {

                            var Prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgid == obj.ProdPrgid && c.Itemid == item.itemid && c.Colorid == item.colorid && c.Sizeid == item.sizeid).FirstOrDefault();
                            if (Prodprgdet != null)
                            {
                                Prodprgdet.Dely_Qty = (Prodprgdet.Dely_Qty - item.IssueQty);

                                entities.SaveChanges();
                            }
                        }
                    }



                    foreach (var stk in FabDelySecAdd.FabricDelySectionStock)
                    {
                        //if (stk.AllotedQty > 0)
                        //{
                            var Pg3 = entities.Proc_Apparel_FabricDelyIssueItmStkUpdate(stk.StockId, obj.FabDelyIssueId);
                            entities.SaveChanges();
                        //}
                    }

                    entities.SaveChanges();

                    int id = 0;
                    var detid = 0;
                    var stockid = 0;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.FabDelyIssueId;
                        }
                    }                   

                    var stkoutwarddet = entities.Item_stock_outward.Where(d => d.TransNo == obj.FabDelyIssueNo).ToList<ProductionItem_stock_outward>();

                    stkoutwarddet.ForEach(c => entities.Item_stock_outward.Remove(c));
                    entities.SaveChanges();

                    var stkdet = entities.FabDelySec_Issue_Stock.Where(d => d.FabDelyIssueId == obj.FabDelyIssueId).ToList<FabDelySec_Issue_Stock>();

                    stkdet.ForEach(c => entities.FabDelySec_Issue_Stock.Remove(c));
                    entities.SaveChanges();

                    var deletedet = entities.FabDelySec_Issue_Det.Where(d => d.FabDelyIssueId == obj.FabDelyIssueId).ToList<FabDelySec_Issue_Det>();

                    deletedet.ForEach(c => entities.FabDelySec_Issue_Det.Remove(c));
                    entities.SaveChanges();

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            entities.FabDelySec_Issue_Det.Add(item);
                            entities.SaveChanges();
                            detid = item.FabDelyIssueDetId;

                            entities.SaveChanges();

                            var Prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgid == obj.ProdPrgid && c.Itemid == item.itemid && c.Colorid == item.colorid && c.Sizeid == item.sizeid).FirstOrDefault();
                            if (Prodprgdet != null)
                            {
                                Prodprgdet.Dely_Qty = (Prodprgdet.Dely_Qty + item.IssueQty);

                                entities.SaveChanges();
                            }
                        }
                    }

                    var ItmListStock = new List<FabDelySec_Issue_Stock>();

                    foreach (var PItem in FabDelySecAdd.FabricDelySectionStock)  //.TemplateDet
                    {
                        if (PItem.AllotedQty > 0)
                        {
                            var FabDelyIssueDetId = entities.FabDelySec_Issue_Det.Where(c => c.itemid == PItem.ItemId && c.FabDelyIssueId == obj.FabDelyIssueId
                                                            && c.colorid == PItem.ColorId && c.sizeid == PItem.SizeId).Select(d => d.FabDelyIssueDetId).First();


                            ItmListStock.Add(new FabDelySec_Issue_Stock
                            {
                                // FabDelyIssueStockId = PItem.FabDelyIssueStockId,
                                FabDelyIssueDetId = (FabDelyIssueDetId == null ? 0 : FabDelyIssueDetId),
                                FabDelyIssueId = obj.FabDelyIssueId,
                                StockId = PItem.StockId,
                                IssueQty = PItem.AllotedQty,
                                ReturnQty = PItem.ReturnQty,
                                LossQty = PItem.LossQty,
                                Markup_rate = PItem.MarkupRate,
                            });
                        }
                    }

                    foreach (var issuelst in ItmListStock)
                    {
                        entities.FabDelySec_Issue_Stock.Add(issuelst);
                    }

                    entities.SaveChanges();

                    var ItmListStock_Outward = new List<ProductionItem_stock_outward>();

                    foreach (var PItem in FabDelySecAdd.FabricDelySectionStock)  //.TemplateDet
                    {
                        if (PItem.AllotedQty > 0)
                        {
                            var FabDelyIssueDetId = entities.FabDelySec_Issue_Det.Where(c => c.itemid == PItem.ItemId && c.FabDelyIssueId == obj.FabDelyIssueId
                                                            && c.colorid == PItem.ColorId && c.sizeid == PItem.SizeId).Select(d => d.FabDelyIssueDetId).First();                            

                            ItmListStock_Outward.Add(new ProductionItem_stock_outward
                            {
                                Itemstockid = PItem.StockId,
                                Unitid = FabDelySecAdd.CompanyUnitId,
                                outwarddate = FabDelySecAdd.FabDelyIssueDate,
                                TransNo = FabDelySecAdd.FabDelyIssueNo,
                                TransType = "FDL",
                                Quantity = PItem.AllotedQty,
                                joborderno = FabDelySecAdd.Joborderno,
                                Unit_Or_Other = "O",
                                ProdIssueDetID = (FabDelyIssueDetId == 0 ? 0 : FabDelyIssueDetId),
                            });
                        }
                    }

                    foreach (var issuelst in ItmListStock_Outward)
                    {
                        entities.Item_stock_outward.Add(issuelst);
                    }

                    entities.SaveChanges();


                    foreach (var stk in FabDelySecAdd.FabricDelySectionStock)
                    {
                        if (stk.AllotedQty > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_UpdateItemStock(stk.StockId, stk.AllotedQty, stk.AllotedQty);
                            entities.SaveChanges();
                        }
                    }

                    entities.SaveChanges();



                    //Update MarkUpRate
                    bool UCMR = MarkUpRateUpdation_Fabric(obj.FabDelyIssueId);

                    //bool UCMR = MarkUpRateOrdUpdation(objupd.processordid);

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    // exceplogg.SendExcepToDB(ex, "ProcessOrder-UpdDetData");
                }
            }
            return reserved;
        }

        public bool Delete(int id, string FabDelyIssueNo)
        {
            var result = false;
            var itemstockList = new List<ItemStock>();

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {                   

                    var cuttingissuemas = entities.FabDelySec_Issue_Mas.Where(c => c.FabDelyIssueId == id).FirstOrDefault();

                    var det = entities.FabDelySec_Issue_Det.Where(c => c.FabDelyIssueId == id).ToList();
                    if (det != null && det.Count > 0)
                    {
                        foreach (var item in det)
                        {

                            var Prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgid == cuttingissuemas.ProdPrgid && c.Itemid == item.itemid && c.Colorid == item.colorid && c.Sizeid == item.sizeid).FirstOrDefault();
                            if (Prodprgdet != null)
                            {
                                Prodprgdet.Dely_Qty = (Prodprgdet.Dely_Qty - item.IssueQty);

                                entities.SaveChanges();
                            }
                        }
                    }


                    if (cuttingissuemas != null)
                    {
                        //delete ItemStock Many Rows table
                        var PRMas = entities.ItemStock.Where(c => c.Transno == FabDelyIssueNo).FirstOrDefault();
                        if (PRMas != null)
                        {
                            var deleteprodItemStock = entities.ItemStock.Where(d => d.Transno == PRMas.Transno).ToList<ProductionItemStock>();
                            deleteprodItemStock.ForEach(c => entities.ItemStock.Remove(c));
                            entities.SaveChanges();
                        }                        

                        var stkoutwarddet = entities.Item_stock_outward.Where(d => d.TransNo == FabDelyIssueNo).ToList<ProductionItem_stock_outward>();

                        stkoutwarddet.ForEach(c => entities.Item_stock_outward.Remove(c));
                        entities.SaveChanges();

                        var Stckupdates = (from CIM in entities.FabDelySec_Issue_Mas
                                           join CIS in entities.FabDelySec_Issue_Stock on CIM.FabDelyIssueId equals CIS.FabDelyIssueId
                                           where (CIM.FabDelyIssueId == id)
                                           select new { CIS.StockId, CIS.IssueQty }).ToList();

                        //ItemStock
                        foreach (var FabDelyissuestckupdates in Stckupdates)
                        {
                            if (FabDelyissuestckupdates.IssueQty > 0)
                            {
                                var Pg3 = entities.Proc_Apparel_FabricDelyIssueItmStkUpdate(FabDelyissuestckupdates.StockId, id);
                                entities.SaveChanges();
                            }
                        }

                        var CuttIssStck = entities.FabDelySec_Issue_Stock.Where(c => c.FabDelyIssueId == cuttingissuemas.FabDelyIssueId).FirstOrDefault();

                        if (CuttIssStck != null)
                        {
                            //delete Cutting_Issue_Stock Many Rows table
                            var deleteCuttingIssueStck = entities.FabDelySec_Issue_Stock.Where(d => d.FabDelyIssueId == cuttingissuemas.FabDelyIssueId).ToList<FabDelySec_Issue_Stock>();
                            deleteCuttingIssueStck.ForEach(c => entities.FabDelySec_Issue_Stock.Remove(c));
                            entities.SaveChanges();
                        }

                        //delete Cutting_Issue_Det Many Rows table
                        var deletecuttingissuedet = entities.FabDelySec_Issue_Det.Where(d => d.FabDelyIssueId == cuttingissuemas.FabDelyIssueId).ToList<FabDelySec_Issue_Det>();
                        deletecuttingissuedet.ForEach(c => entities.FabDelySec_Issue_Det.Remove(c));
                        entities.SaveChanges();

                        //delete Cutting_Issue_Mas Many Rows table
                        entities.FabDelySec_Issue_Mas.Remove(cuttingissuemas);
                        entities.SaveChanges();
                    }                    

                    //The Transaction will be completed
                    txscope.Complete();
                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool UpdateReceipt(FabDelySec_Issue_Mas objMas, List<FabDelySec_Issue_Det> objdet, List<FabDelySec_Issue_Stock> objstock, FabricDelySection_Mas obj)
        {
            bool reserved = false;
            int prgid=0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var Upd1 = entities.FabDelySec_Issue_Mas.Where(c => c.FabDelyIssueId == objMas.FabDelyIssueId).FirstOrDefault();
                    prgid = (int)Upd1.ProdPrgid;

                    var det = entities.FabDelySec_Issue_Det.Where(c => c.FabDelyIssueId == obj.FabDelyIssueId).ToList();
                    if (det != null && det.Count > 0)
                    {
                        foreach (var item in det)
                        {

                            var Prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgid == prgid && c.Itemid == item.itemid && c.Colorid == item.colorid && c.Sizeid == item.sizeid).FirstOrDefault();
                            if (Prodprgdet != null)
                            {
                                if (item.ReturnQty > 0)
                                {
                                    if (Prodprgdet.Dely_Returnqty != null)
                                    {
                                        Prodprgdet.Dely_Returnqty = ((Prodprgdet.Dely_Returnqty == null ? 0 : Prodprgdet.Dely_Returnqty) - item.ReturnQty);
                                    }
                                }

                                entities.SaveChanges();
                            }
                        }
                    }
                    
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            var Upd = entities.FabDelySec_Issue_Det.Where(c => c.FabDelyIssueDetId == item.FabDelyIssueDetId && c.FabDelyIssueId == item.FabDelyIssueId).FirstOrDefault();
                            if (Upd != null)
                            {
                                // Upd.FabDelyIssueId = item.FabDelyIssueId;
                                // Upd.FabDelyIssueDetId = item.FabDelyIssueDetId;
                                Upd.receivedqty = item.receivedqty;
                                Upd.ReturnQty = item.ReturnQty;

                                entities.SaveChanges();

                                var Prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgid == prgid && c.Itemid == item.itemid && c.Colorid == item.colorid && c.Sizeid == item.sizeid).FirstOrDefault();
                                if (Prodprgdet != null)
                                {
                                    if (item.ReturnQty > 0)
                                    {
                                        Prodprgdet.Dely_Returnqty = (Prodprgdet.Dely_Returnqty == null ? 0 : Prodprgdet.Dely_Returnqty) + item.ReturnQty;
                                    }

                                    entities.SaveChanges();
                                }                                
                            }

                            var UpdMas = entities.FabDelySec_Issue_Mas.Where(c => c.FabDelyIssueId == objMas.FabDelyIssueId).FirstOrDefault();
                            if (UpdMas != null)
                            {
                                UpdMas.ToStoreid = objMas.ToStoreid;
                                UpdMas.Remarks = objMas.Remarks;
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objstock != null && objstock.Count > 0)
                    {
                        foreach (var item in objstock)
                        {
                            var Updstk = entities.FabDelySec_Issue_Stock.Where(c => c.FabDelyIssueStockId == item.FabDelyIssueStockId && c.FabDelyIssueDetId == item.FabDelyIssueDetId && c.FabDelyIssueId == item.FabDelyIssueId).FirstOrDefault();
                            if (Updstk != null)
                            {
                             //   Updstk.FabDelyIssueId = item.FabDelyIssueId;
                             //   Updstk.FabDelyIssueDetId = item.FabDelyIssueDetId;
                                Updstk.ReturnQty = item.ReturnQty;

                                entities.SaveChanges();
                            }
                        }
                    }

                    //delete ItemStock Many Rows table
                    var PRMas = entities.ItemStock.Where(c => c.Transno == obj.FabDelyIssueNo).FirstOrDefault();
                    if (PRMas != null)
                    {
                        var deleteprodItemStock = entities.ItemStock.Where(d => d.Transno == PRMas.Transno).ToList<ProductionItemStock>();
                        deleteprodItemStock.ForEach(c => entities.ItemStock.Remove(c));
                        entities.SaveChanges();
                    }
                    
                    if (obj.Mode == "Add/Edit" && obj.MainType == "Receipt/Return")
                    {
                        //Insert into ItemStock Table
                        var InsertintoItemStockReceipt = entities.Proc_Apparel_SP_PostFabricDelyRecptItemStock(obj.FabDelyIssueNo, "Receipt");
                        entities.SaveChanges();

                        var InsertintoItemStockReturn = entities.Proc_Apparel_SP_PostFabricDelyRecptItemStock(obj.FabDelyIssueNo, "Return");
                        entities.SaveChanges();
                    }                   

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    // exceplogg.SendExcepToDB(ex, "ProcessOrder-UpdDetData");
                }
            }
            return reserved;
        }
    }
}
