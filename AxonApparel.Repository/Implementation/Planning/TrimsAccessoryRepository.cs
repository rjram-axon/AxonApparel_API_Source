using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
//using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Transactions;
using System.Data.Entity.Validation;
using System.Data.Objects.SqlClient;

namespace AxonApparel.Repository
{
    public class TrimsAccessoryRepository : ITrimsRepository
    {
        PlanningEntities entities = new PlanningEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<TrimsAccessory> GetTrimsDetails(string OrderNo)
        {
            IQueryable<TrimsAccessory> query = (from T in entities.Proc_Apparel_GetTrimItemDetails(OrderNo)
                                                select new TrimsAccessory
                                                {
                                                    CompanyId = (int)T.companyid,
                                                    Company = T.company,
                                                    BuyerId = (int)T.buyerid,
                                                    Buyer = T.buyer,
                                                    StyleId = T.styleid,
                                                    Style = T.style,
                                                    RefNo = T.ref_no,
                                                    OrderNo = T.order_no,
                                                    Quantity = (int)T.quantity,
                                                    OrderDate = (DateTime)T.order_Date
                                                }).AsQueryable();

            return query.DefaultIfEmpty();
        }

        //private static int[] StringToIntArray(string myNumbers)
        //{
        //    List<int> myIntegers = new List<int>();
        //    Array.ForEach(myNumbers.Split(",".ToCharArray()), s =>
        //    {
        //        int currentInt;
        //        if (Int32.TryParse(s, out currentInt))
        //            myIntegers.Add(currentInt);
        //    });
        //    return myIntegers.ToArray();
        //}

        public bool AddStyleTemplateMaster(string OrderNo, int Styleid, string Stylename)
        {
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var StyleTemp = entities.Proc_Apparel_CreateStyleTemplate(OrderNo, (int)Styleid, Stylename);

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Trims-AddData");
                    return false;
                    throw ex;
                }
            }
        }

        public bool AddStyleTemplateData(string Orderno, DateTime EntryDate, int Styleid, int BuyOrdMasid, int ItemId, int AccColorId, int AccSizeId, int Mode, int PlanId, AccessoryReqMas accreqmasobj)
        {
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                int ItmId = 0;
                int PlId = 0;
                string applytype = string.Empty;

                try
                {
                    //Adding Acc_Req_Style Begin
                    var accreqstyle = new Acc_Req_Style();
                    var accordbommas = new Buy_Ord_BOMMas();
                    var accordbomdet = new Buy_Ord_BOMDet();
                    var PlanAdd = new Planning_Mas();
                    List<TrimsGenAuto> trimsgenautolst = new List<TrimsGenAuto>();
                    List<TrimsGenAuto> trimsgenmanuallst = new List<TrimsGenAuto>();

                    var Accreqid = 0;
                    var plantype = 0;
                    var companyid = 0;

                    var Buyordsty = entities.Acc_Req_Style.Where(d => d.Order_No == Orderno && d.StyleID == Styleid && d.StyleItemID == ItemId).FirstOrDefault();

                    if (Buyordsty == null)
                    {
                        accreqstyle.Order_No = Orderno;
                        accreqstyle.BuyOrdMasId = BuyOrdMasid;
                        accreqstyle.StyleID = Styleid;
                        accreqstyle.StyleItemID = ItemId;
                        accreqstyle.EntryDate = EntryDate;//Convert.ToDateTime("2018-01-03");
                        accreqstyle.BuyOrJob = "B";
                        accreqstyle.AccOrPack = "A";
                        accreqstyle.Amend = "N";

                        var buyordmasid = entities.Acc_Req_Style.Add(accreqstyle);
                        entities.SaveChanges();
                        Accreqid = buyordmasid.AccReqID;
                    }
                    else
                    {
                        Accreqid = Buyordsty.AccReqID;
                    }
                    //Adding Acc_Req_Style End            

                    //Adding Acc_Req_Mas and Det Begin
                    //Style Template for General-Auto Begin
                    var StyleTempDet = entities.StyleTempDet.Where(d => d.TemplateId == accreqmasobj.StyleTemplateId && d.GColorid == null && d.GSizeid == null).ToList();
                    if (StyleTempDet != null)
                    {
                        foreach (var stytempdet in StyleTempDet)
                        {
                            Acc_Req_Mas accreq = new Acc_Req_Mas();
                            var accreMasId = 0;

                            //accreq.ShipRowID = accreqshipmas.shiprowid;
                            accreq.AccReqID = Accreqid;
                            accreq.ItemID = stytempdet.ItemId;
                            accreq.Allowance = 0;
                            accreq.UnitId = entities.Item.Where(e => e.ItemId == ItemId).Select(i => i.Bas_Unit).FirstOrDefault();
                            accreq.Quantity = (accreqmasobj.ProdQty * stytempdet.Qty);
                            accreq.PlanType = 4;
                            accreq.DivMul = "M";
                            accreq.AutoOrMan = "A";
                            accreq.Prod_or_Ord = "P";
                            //accreq.Item_Remarks = accreqmas.Item_Remarks;
                            accreq.Add_Date = EntryDate;
                            accreq.ShipRowID = 0;
                            accreq.LockRow = "Y";
                            accreq.GenPlanType = "O";
                            accreq.Amend = "P";
                            accreq.CreatedBy = accreqmasobj.CreatedBy;

                            var id = entities.Acc_Req_Mas.Add(accreq);
                            entities.SaveChanges();
                            accreMasId = id.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();

                            objAccReqDet.AccReqMasID = accreMasId;
                            //objAccReqDet.GarSizeID = 0;
                            objAccReqDet.AccColorID = stytempdet.ColorId;
                            objAccReqDet.AccSizeID = stytempdet.SizeId;
                            objAccReqDet.QtyPerPiece = stytempdet.Qty;
                            objAccReqDet.TotalQty = (accreqmasobj.ProdQty * stytempdet.Qty);
                            objAccReqDet.BOMQty = 0;// accreqdet.ReqQty;
                            //objAccReqDet.PColorID = (accreqdet.PColorid == 0 ? PColorId : accreqdet.PColorid);
                            //objAccReqDet.PQty = accreqdet.ProcessQty;
                            //objAccReqDet.ItemCode = (accreqdet.ItemCode == "" ? ItemCode : accreqdet.ItemCode);
                            objAccReqDet.GarQty = accreqmasobj.ProdQty;
                            objAccReqDet.Rate = stytempdet.Rate;

                            entities.Acc_Req_Det.Add(objAccReqDet);
                            entities.SaveChanges();
                        }
                    }
                    //Style Template for General-Auto End

                    //Style Template for Color-Auto Begin
                    var BuyOrdSty = entities.buy_ord_style.Where(d => d.order_no == Orderno && d.Styleid == Styleid).FirstOrDefault();
                    string colorid = string.Empty;

                    if (BuyOrdSty != null)
                    {
                        var Comboclr = entities.ComboColor.Where(d => d.StyleRowId == BuyOrdSty.StyleRowid).ToList();
                        if (Comboclr != null)
                        {
                            foreach (var comb in Comboclr)
                            {
                                if (colorid == string.Empty)
                                {
                                    colorid = comb.Colorid.ToString();
                                }
                                else
                                {
                                    colorid = colorid + "," + comb.Colorid.ToString();
                                }
                            }
                        }
                    }

                    //Converting string to Array Int
                    int[] colorint = Array.ConvertAll(colorid.Split(','), int.Parse);

                    var StyleTempColorDet = entities.StyleTempDet.Where(d => d.TemplateId == accreqmasobj.StyleTemplateId
                        && d.GSizeid == null && colorint.Contains((int)d.GColorid)).ToList();

                    if (StyleTempColorDet != null)
                    {
                        foreach (var stytempdet in StyleTempColorDet)
                        {
                            Acc_Req_Mas accreq = new Acc_Req_Mas();
                            var accreMasId = 0;
                            //int styleTempid, stytempItemId, stytempGColorid = 0;

                            //styleTempid=accreqmasobj.StyleTemplateId;
                            //stytempItemId=stytempdet.ItemId;
                            //stytempGColorid =(int) stytempdet.GColorid;

                            //accreq.ShipRowID = accreqshipmas.shiprowid;
                            accreq.AccReqID = Accreqid;
                            accreq.ItemID = stytempdet.ItemId;
                            accreq.Allowance = 0;
                            accreq.UnitId = entities.Item.Where(e => e.ItemId == ItemId).Select(i => i.Bas_Unit).FirstOrDefault();
                            accreq.Quantity = (accreqmasobj.ProdQty * stytempdet.Qty);
                            accreq.PlanType = 1;
                            accreq.DivMul = "M";
                            accreq.AutoOrMan = "A";
                            accreq.Prod_or_Ord = "P";
                            //accreq.Item_Remarks = accreqmas.Item_Remarks;
                            accreq.Add_Date = EntryDate;
                            accreq.ShipRowID = 0;
                            accreq.LockRow = "Y";
                            accreq.GenPlanType = "O";
                            accreq.Amend = "P";
                            accreq.CreatedBy = accreqmasobj.CreatedBy;

                            var id = entities.Acc_Req_Mas.Add(accreq);
                            entities.SaveChanges();
                            accreMasId = id.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();

                            objAccReqDet.AccReqMasID = accreMasId;
                            //objAccReqDet.GarSizeID = 0;
                            objAccReqDet.AccColorID = stytempdet.ColorId;
                            objAccReqDet.AccSizeID = stytempdet.SizeId;
                            objAccReqDet.GarColorID = stytempdet.GColorid;
                            objAccReqDet.QtyPerPiece = stytempdet.Qty;
                            objAccReqDet.BOMQty = 0;// accreqdet.ReqQty;
                            //objAccReqDet.PColorID = (accreqdet.PColorid == 0 ? PColorId : accreqdet.PColorid);
                            //objAccReqDet.PQty = accreqdet.ProcessQty;
                            //objAccReqDet.ItemCode = (accreqdet.ItemCode == "" ? ItemCode : accreqdet.ItemCode);
                            objAccReqDet.GarQty = GetGarQtyColorWise(Orderno, Styleid, accreqmasobj.StyleTemplateId, stytempdet.ItemId, (int)stytempdet.ColorId, stytempdet.SizeId, "Color");// accreqmasobj.ProdQty;                            
                            objAccReqDet.TotalQty = (objAccReqDet.GarQty * stytempdet.Qty);//(accreqmasobj.ProdQty * stytempdet.Qty);
                            objAccReqDet.Rate = stytempdet.Rate;

                            entities.Acc_Req_Det.Add(objAccReqDet);
                            entities.SaveChanges();
                        }
                    }
                    //Style Template for Color-Auto End

                    //Style Template for Size-Auto Begin                    
                    string sizesid = string.Empty;

                    if (BuyOrdSty != null)
                    {
                        var Combosiz = entities.Combosize.Where(d => d.StyleRowId == BuyOrdSty.StyleRowid).ToList();
                        if (Combosiz != null)
                        {
                            foreach (var combsiz in Combosiz)
                            {
                                if (sizesid == string.Empty)
                                {
                                    sizesid = combsiz.SizeId.ToString();
                                }
                                else
                                {
                                    sizesid = sizesid + "," + combsiz.SizeId.ToString();
                                }
                            }
                        }
                    }

                    int[] sizint = Array.ConvertAll(sizesid.Split(','), int.Parse);

                    var StyleTempSizeDet = entities.StyleTempDet.Where(d => d.TemplateId == accreqmasobj.StyleTemplateId
                        && d.GColorid == null && sizint.Contains((int)d.GSizeid)).ToList();

                    if (StyleTempSizeDet != null)
                    {
                        foreach (var stytempdet in StyleTempSizeDet)
                        {
                            Acc_Req_Mas accreq = new Acc_Req_Mas();
                            var accreMasId = 0;

                            //accreq.ShipRowID = accreqshipmas.shiprowid;
                            accreq.AccReqID = Accreqid;
                            accreq.ItemID = stytempdet.ItemId;
                            accreq.Allowance = 0;
                            accreq.UnitId = entities.Item.Where(e => e.ItemId == ItemId).Select(i => i.Bas_Unit).FirstOrDefault();
                            accreq.Quantity = (accreqmasobj.ProdQty * stytempdet.Qty);
                            accreq.PlanType = 2;
                            accreq.DivMul = "M";
                            accreq.AutoOrMan = "A";
                            accreq.Prod_or_Ord = "P";
                            //accreq.Item_Remarks = accreqmas.Item_Remarks;
                            accreq.Add_Date = EntryDate;
                            accreq.ShipRowID = 0;
                            accreq.LockRow = "Y";
                            accreq.GenPlanType = "O";
                            accreq.Amend = "P";
                            accreq.CreatedBy = accreqmasobj.CreatedBy;

                            var id = entities.Acc_Req_Mas.Add(accreq);
                            entities.SaveChanges();
                            accreMasId = id.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();

                            objAccReqDet.AccReqMasID = accreMasId;
                            //objAccReqDet.GarSizeID = 0;
                            objAccReqDet.AccColorID = stytempdet.ColorId;
                            objAccReqDet.AccSizeID = stytempdet.SizeId;
                            objAccReqDet.GarSizeID = stytempdet.GSizeid;
                            objAccReqDet.QtyPerPiece = stytempdet.Qty;
                            objAccReqDet.BOMQty = 0;// accreqdet.ReqQty;
                            //objAccReqDet.PColorID = (accreqdet.PColorid == 0 ? PColorId : accreqdet.PColorid);
                            //objAccReqDet.PQty = accreqdet.ProcessQty;
                            //objAccReqDet.ItemCode = (accreqdet.ItemCode == "" ? ItemCode : accreqdet.ItemCode);
                            objAccReqDet.GarQty = GetGarQtyColorWise(Orderno, Styleid, accreqmasobj.StyleTemplateId, stytempdet.ItemId, (int)stytempdet.ColorId, stytempdet.SizeId, "Size");// accreqmasobj.ProdQty;
                            objAccReqDet.TotalQty = (objAccReqDet.GarQty * stytempdet.Qty);// (accreqmasobj.ProdQty * stytempdet.Qty);
                            objAccReqDet.Rate = stytempdet.Rate;

                            entities.Acc_Req_Det.Add(objAccReqDet);
                            entities.SaveChanges();
                        }
                    }
                    //Style Template for Size-Auto End

                    //Style Template for Style-Auto Begin
                    string stycolorid = string.Empty;
                    string stysizesid = string.Empty;

                    if (BuyOrdSty != null)
                    {
                        var styComboclr = entities.ComboColor.Where(d => d.StyleRowId == BuyOrdSty.StyleRowid).ToList();
                        if (styComboclr != null)
                        {
                            foreach (var comb in styComboclr)
                            {
                                if (stycolorid == string.Empty)
                                {
                                    stycolorid = comb.Colorid.ToString();
                                }
                                else
                                {
                                    stycolorid = stycolorid + "," + comb.Colorid.ToString();
                                }
                            }
                        }
                    }

                    if (BuyOrdSty != null)
                    {
                        var styCombosiz = entities.Combosize.Where(d => d.StyleRowId == BuyOrdSty.StyleRowid).ToList();
                        if (styCombosiz != null)
                        {
                            foreach (var combsiz in styCombosiz)
                            {
                                if (stysizesid == string.Empty)
                                {
                                    stysizesid = combsiz.SizeId.ToString();
                                }
                                else
                                {
                                    stysizesid = stysizesid + "," + combsiz.SizeId.ToString();
                                }
                            }
                        }
                    }

                    int[] styclrint = Array.ConvertAll(stycolorid.Split(','), int.Parse);
                    int[] stysizint = Array.ConvertAll(stysizesid.Split(','), int.Parse);

                    //var StyleTempStyleDet = entities.StyleTempDet.Where(d => d.TemplateId == accreqmasobj.StyleTemplateId 
                    //    && d.GColorid != null && d.GSizeid != null).ToList();
                    var StyleTempStyleDet = entities.StyleTempDet.Where(d => d.TemplateId == accreqmasobj.StyleTemplateId
                        && styclrint.Contains((int)d.GColorid) && stysizint.Contains((int)d.GSizeid) && d.GColorid != null && d.GSizeid != null).ToList();

                    if (StyleTempStyleDet != null)
                    {
                        foreach (var stytempdet in StyleTempStyleDet)
                        {
                            Acc_Req_Mas accreq = new Acc_Req_Mas();
                            var accreMasId = 0;

                            //accreq.ShipRowID = accreqshipmas.shiprowid;
                            accreq.AccReqID = Accreqid;
                            accreq.ItemID = stytempdet.ItemId;
                            accreq.Allowance = 0;
                            accreq.UnitId = entities.Item.Where(e => e.ItemId == ItemId).Select(i => i.Bas_Unit).FirstOrDefault();
                            accreq.Quantity = (accreqmasobj.ProdQty * stytempdet.Qty);
                            accreq.PlanType = 3;
                            accreq.DivMul = "M";
                            accreq.AutoOrMan = "A";
                            accreq.Prod_or_Ord = "P";
                            //accreq.Item_Remarks = accreqmas.Item_Remarks;
                            accreq.Add_Date = EntryDate;
                            accreq.ShipRowID = 0;
                            accreq.LockRow = "Y";
                            accreq.GenPlanType = "O";
                            accreq.Amend = "P";
                            accreq.CreatedBy = accreqmasobj.CreatedBy;

                            var id = entities.Acc_Req_Mas.Add(accreq);
                            entities.SaveChanges();
                            accreMasId = id.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();

                            objAccReqDet.AccReqMasID = accreMasId;
                            //objAccReqDet.GarSizeID = 0;
                            objAccReqDet.AccColorID = stytempdet.ColorId;
                            objAccReqDet.AccSizeID = stytempdet.SizeId;
                            objAccReqDet.GarColorID = stytempdet.GColorid;
                            objAccReqDet.GarSizeID = stytempdet.GSizeid;
                            objAccReqDet.QtyPerPiece = stytempdet.Qty;
                            objAccReqDet.BOMQty = 0;// accreqdet.ReqQty;
                            objAccReqDet.PQty = 0;
                            //objAccReqDet.PColorID = (accreqdet.PColorid == 0 ? PColorId : accreqdet.PColorid);
                            //objAccReqDet.PQty = accreqdet.ProcessQty;
                            //objAccReqDet.ItemCode = (accreqdet.ItemCode == "" ? ItemCode : accreqdet.ItemCode);
                            objAccReqDet.GarQty = GetGarQtyColorWise(Orderno, Styleid, accreqmasobj.StyleTemplateId, stytempdet.ItemId, (int)stytempdet.ColorId, (int)stytempdet.SizeId, "Style");// accreqmasobj.ProdQty;
                            objAccReqDet.TotalQty = (objAccReqDet.GarQty * stytempdet.Qty); //(accreqmasobj.ProdQty * stytempdet.Qty);
                            objAccReqDet.Rate = stytempdet.Rate;

                            entities.Acc_Req_Det.Add(objAccReqDet);
                            entities.SaveChanges();
                        }
                    }
                    //Style Template for Style-Auto End

                    var OQueryB = entities.Buy_Ord_Mas.Where(b => b.Buy_Ord_MasId == BuyOrdMasid).FirstOrDefault();
                    if (OQueryB != null)
                    {
                        companyid = (int)OQueryB.CompanyId;
                        BuyOrdMasid = (int)OQueryB.Buy_Ord_MasId;
                    }
                    //Adding Acc_Req_Mas and Det End

                    int Buy_ordBomMasId = 0;
                    if (Mode == 0)
                    {
                        var BuyordBomMas = entities.Buy_Ord_BOMMas.Where(d => d.Order_No == Orderno && d.Styleid == Styleid && d.Access_Type == "A").FirstOrDefault();
                        if (BuyordBomMas == null)
                        {
                            //Adding Buy_Ord_BOMMas Begin
                            accordbommas.Order_No = Orderno;
                            accordbommas.Styleid = Styleid;
                            accordbommas.Access_Type = "A";
                            accordbommas.Order_Qty = 0;
                            accordbommas.ToJob = 0;
                            accordbommas.ByJob = 0;
                            accordbommas.Prog_thru = "A";
                            accordbommas.Companyid = companyid;
                            accordbommas.ToWork = 0;
                            accordbommas.seqno = null;

                            var buyordbommasid = entities.Buy_Ord_BOMMas.Add(accordbommas);
                            entities.SaveChanges();

                            Buy_ordBomMasId = buyordbommasid.Buy_Ord_BOMid;
                        }
                        else
                        {
                            Buy_ordBomMasId = BuyordBomMas.Buy_Ord_BOMid;
                        }


                        foreach (var stytempdet in StyleTempDet)
                        {
                            var bomdet = GetBuyOrdBomDetforStyleTemp(Orderno, stytempdet.ItemId, Styleid, 4, "A", stytempdet.ColorId, stytempdet.SizeId);

                            if (bomdet.Count > 0)
                            {
                                foreach (var bomdetinfo in bomdet)
                                {
                                    accordbomdet.Buy_Ord_BOMid = Buy_ordBomMasId;
                                    accordbomdet.Itemid = bomdetinfo.itemid;
                                    accordbomdet.Colorid = (bomdetinfo.acccolorid == 0 ? (int?)null : bomdetinfo.acccolorid);
                                    accordbomdet.Sizeid = (bomdetinfo.accsizeid == 0 ? (int?)null : bomdetinfo.accsizeid);

                                    var uomid = entities.Item.Where(d => d.ItemId == bomdetinfo.itemid).FirstOrDefault();
                                    accordbomdet.UOMid = (int)uomid.Bas_Unit;

                                    accordbomdet.Prg_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Order_qty = 0;
                                    accordbomdet.Received_qty = 0;
                                    accordbomdet.Issue_qty = 0;
                                    accordbomdet.Adjust_Qty = 0;
                                    accordbomdet.BOM_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Pur_UOMid = uomid.Bas_Unit;
                                    accordbomdet.ToPurUOM = 1;
                                    accordbomdet.Conv_Mode = "M";
                                    accordbomdet.PurForJob = "N";
                                    accordbomdet.Debit_qty = 0;
                                    accordbomdet.Transfer_In = 0;
                                    accordbomdet.Transfer_Out = 0;
                                    accordbomdet.Cancel_Qty = 0;
                                    accordbomdet.CSP = "N";
                                    accordbomdet.AltItem = "N";
                                    accordbomdet.ItemClosure = "N";
                                    accordbomdet.EntryDate = DateTime.Now;
                                    accordbomdet.ItemRemarks = "";
                                    accordbomdet.StockOut = 0;

                                    entities.Buy_Ord_BOMDet.Add(accordbomdet);
                                    entities.SaveChanges();
                                }
                            }
                        }

                        foreach (var stytempColordet in StyleTempColorDet)
                        {
                            var bomdet = GetBuyOrdBomDetforStyleTemp(Orderno, stytempColordet.ItemId, Styleid, 1, "A", stytempColordet.ColorId, stytempColordet.SizeId);

                            if (bomdet.Count > 0)
                            {
                                foreach (var bomdetinfo in bomdet)
                                {
                                    accordbomdet.Buy_Ord_BOMid = Buy_ordBomMasId;
                                    accordbomdet.Itemid = bomdetinfo.itemid;
                                    accordbomdet.Colorid = (bomdetinfo.acccolorid == 0 ? (int?)null : bomdetinfo.acccolorid);
                                    accordbomdet.Sizeid = (bomdetinfo.accsizeid == 0 ? (int?)null : bomdetinfo.accsizeid);

                                    var uomid = entities.Item.Where(d => d.ItemId == bomdetinfo.itemid).FirstOrDefault();
                                    accordbomdet.UOMid = (int)uomid.Bas_Unit;

                                    accordbomdet.Prg_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Order_qty = 0;
                                    accordbomdet.Received_qty = 0;
                                    accordbomdet.Issue_qty = 0;
                                    accordbomdet.Adjust_Qty = 0;
                                    accordbomdet.BOM_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Pur_UOMid = uomid.Bas_Unit;
                                    accordbomdet.ToPurUOM = 1;
                                    accordbomdet.Conv_Mode = "M";
                                    accordbomdet.PurForJob = "N";
                                    accordbomdet.Debit_qty = 0;
                                    accordbomdet.Transfer_In = 0;
                                    accordbomdet.Transfer_Out = 0;
                                    accordbomdet.Cancel_Qty = 0;
                                    accordbomdet.CSP = "N";
                                    accordbomdet.AltItem = "N";
                                    accordbomdet.ItemClosure = "N";
                                    accordbomdet.EntryDate = DateTime.Now;
                                    accordbomdet.ItemRemarks = "";
                                    accordbomdet.StockOut = 0;

                                    entities.Buy_Ord_BOMDet.Add(accordbomdet);
                                    entities.SaveChanges();
                                }
                            }
                        }


                        foreach (var stytempSizedet in StyleTempSizeDet)
                        {
                            var bomdet = GetBuyOrdBomDetforStyleTemp(Orderno, stytempSizedet.ItemId, Styleid, 2, "A", stytempSizedet.ColorId, stytempSizedet.SizeId);

                            if (bomdet.Count > 0)
                            {
                                foreach (var bomdetinfo in bomdet)
                                {
                                    accordbomdet.Buy_Ord_BOMid = Buy_ordBomMasId;
                                    accordbomdet.Itemid = bomdetinfo.itemid;
                                    accordbomdet.Colorid = (bomdetinfo.acccolorid == 0 ? (int?)null : bomdetinfo.acccolorid);
                                    accordbomdet.Sizeid = (bomdetinfo.accsizeid == 0 ? (int?)null : bomdetinfo.accsizeid);

                                    var uomid = entities.Item.Where(d => d.ItemId == bomdetinfo.itemid).FirstOrDefault();
                                    accordbomdet.UOMid = (int)uomid.Bas_Unit;

                                    accordbomdet.Prg_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Order_qty = 0;
                                    accordbomdet.Received_qty = 0;
                                    accordbomdet.Issue_qty = 0;
                                    accordbomdet.Adjust_Qty = 0;
                                    accordbomdet.BOM_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Pur_UOMid = uomid.Bas_Unit;
                                    accordbomdet.ToPurUOM = 1;
                                    accordbomdet.Conv_Mode = "M";
                                    accordbomdet.PurForJob = "N";
                                    accordbomdet.Debit_qty = 0;
                                    accordbomdet.Transfer_In = 0;
                                    accordbomdet.Transfer_Out = 0;
                                    accordbomdet.Cancel_Qty = 0;
                                    accordbomdet.CSP = "N";
                                    accordbomdet.AltItem = "N";
                                    accordbomdet.ItemClosure = "N";
                                    accordbomdet.EntryDate = DateTime.Now;
                                    accordbomdet.ItemRemarks = "";
                                    accordbomdet.StockOut = 0;

                                    entities.Buy_Ord_BOMDet.Add(accordbomdet);
                                    entities.SaveChanges();
                                }
                            }
                        }

                        foreach (var stytempStyledet in StyleTempStyleDet)
                        {
                            var bomdet = GetBuyOrdBomDetforStyleTemp(Orderno, stytempStyledet.ItemId, Styleid, 3, "A", stytempStyledet.ColorId, stytempStyledet.SizeId);

                            if (bomdet.Count > 0)
                            {
                                foreach (var bomdetinfo in bomdet)
                                {
                                    accordbomdet.Buy_Ord_BOMid = Buy_ordBomMasId;
                                    accordbomdet.Itemid = bomdetinfo.itemid;
                                    accordbomdet.Colorid = (bomdetinfo.acccolorid == 0 ? (int?)null : bomdetinfo.acccolorid);
                                    accordbomdet.Sizeid = (bomdetinfo.accsizeid == 0 ? (int?)null : bomdetinfo.accsizeid);

                                    var uomid = entities.Item.Where(d => d.ItemId == bomdetinfo.itemid).FirstOrDefault();
                                    accordbomdet.UOMid = (int)uomid.Bas_Unit;

                                    accordbomdet.Prg_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Order_qty = 0;
                                    accordbomdet.Received_qty = 0;
                                    accordbomdet.Issue_qty = 0;
                                    accordbomdet.Adjust_Qty = 0;
                                    accordbomdet.BOM_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Pur_UOMid = uomid.Bas_Unit;
                                    accordbomdet.ToPurUOM = 1;
                                    accordbomdet.Conv_Mode = "M";
                                    accordbomdet.PurForJob = "N";
                                    accordbomdet.Debit_qty = 0;
                                    accordbomdet.Transfer_In = 0;
                                    accordbomdet.Transfer_Out = 0;
                                    accordbomdet.Cancel_Qty = 0;
                                    accordbomdet.CSP = "N";
                                    accordbomdet.AltItem = "N";
                                    accordbomdet.ItemClosure = "N";
                                    accordbomdet.EntryDate = DateTime.Now;
                                    accordbomdet.ItemRemarks = "";
                                    accordbomdet.StockOut = 0;

                                    entities.Buy_Ord_BOMDet.Add(accordbomdet);
                                    entities.SaveChanges();
                                }
                            }
                        }
                        //Adding Buy_Ord_BOMMas End
                    }

                    //
                    //Check the Planning Entry Made
                    var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == Orderno && b.StyleID == Styleid && b.CompanyID == companyid && b.ItemID == ItemId).FirstOrDefault();
                    if (OQueryP != null)
                    {
                        PlId = OQueryP.PlanID;

                        if (PlId > 0)
                        {
                            var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                            if (AppMas != null)
                            {
                                AppMas.Acc_Plan = "E";
                            }
                            entities.SaveChanges();
                        }
                    }
                    else
                    {
                        if (PlId == 0)
                        {
                            PlanAdd.CompanyID = companyid;
                            PlanAdd.Buy_Ord_MasId = BuyOrdMasid;
                            PlanAdd.Order_No = Orderno;
                            PlanAdd.StyleID = Styleid;
                            PlanAdd.ItemID = ItemId;
                            PlanAdd.Acc_Plan = "E";
                            PlanAdd.Pack_Plan = "N";
                            PlanAdd.Con_Plan = "N";
                            PlanAdd.Fabric_Plan = "N";
                            PlanAdd.Yarn_Plan = "N";
                            var id = entities.Planning_Mas.Add(PlanAdd);
                            entities.SaveChanges();
                        }
                    }
                    //

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Trims-AddData");
                    return false;
                    throw ex;
                }
            }
        }

        public decimal GetGarQtyColorWise(string ordno, int styleid, int templateid, int itemid, int colorid, int sizeid, string TrimsType)
        {
            decimal GarQty = 0;
            //var getqty=from BM in entities.Buy_Ord_Mas
            //            join BOS in entities.buy_ord_style on BM.Order_No equals BOS.order_no
            //            join BOD in entities.Buy_Ord_Det on new{BM.Order_No,BOS.StyleRowid } equals new{BOD.Order_No,BOD.StyleRowId}
            //            join ST in entities.StyleTempDet on 1 equals 1 && ST.GColorid equals Bod
            if (TrimsType == "Color")
            {
                var qtycolorwise = entities.Proc_Apparel_GetColorwiseGarQty(ordno, styleid, templateid, itemid, colorid, sizeid).FirstOrDefault();
                if (qtycolorwise != null)
                {
                    GarQty = (decimal)qtycolorwise.GQty;
                }
            }
            else if (TrimsType == "Size")
            {
                var qtysizewise = entities.Proc_Apparel_GetSizewiseGarQty(ordno, styleid, templateid, itemid, colorid, sizeid).FirstOrDefault();
                if (qtysizewise != null)
                {
                    GarQty = (decimal)qtysizewise.GQty;
                }
            }
            else if (TrimsType == "Style")
            {
                var qtystylewise = entities.Proc_Apparel_GetStylewiseGarQty(ordno, styleid, templateid, itemid, colorid, sizeid).FirstOrDefault();
                if (qtystylewise != null)
                {
                    GarQty = (decimal)qtystylewise.GQty;
                }
            }


            return GarQty;
        }

        public IQueryable<PlanningItem> GetUomName(int ItemId)
        {
            return entities.Item.Where(c => c.ItemId == ItemId).AsQueryable();
        }

        public IQueryable<AccessoryReqMas> GetAccReqId(AccessoryReqMas objdet)
        {
            IQueryable<AccessoryReqMas> query = (from T in entities.Proc_Apparel_AccReqDetails(objdet.OrderNo, objdet.StyleId, objdet.ItemId, "A")
                                                 select new AccessoryReqMas
                                                 {
                                                     AccReqID = T.AccReqId,
                                                 }).AsQueryable();
            return query;
        }

        public IQueryable<AccessoryReqMas> GetAccReqMasandDet(int accreqid)
        {
            IQueryable<AccessoryReqMas> query = (from T in entities.Acc_Req_Mas
                                                 where T.AccReqID == accreqid
                                                 select new AccessoryReqMas
                                                 {
                                                     AccReqID = (int)T.AccReqID,
                                                     AccReqMasID = T.AccReqMasID,
                                                     itemrowseq = (int)T.RowSeq,
                                                     ItemName = T.Item.Item1,
                                                     ItemId = T.ItemID,
                                                     Unitid = (int)T.UnitId,
                                                     UOM = T.Unit_of_measurement.Uom,
                                                     Allowance = (int)T.Allowance,
                                                     quantity = T.Quantity,
                                                     PlanType = (T.PlanType == 1 ? "Color" : T.PlanType == 2 ? "Size" : T.PlanType == 3 ? "Style" : T.PlanType == 4 ? "General" : "--Select Color--"),
                                                     DivMul = T.DivMul,
                                                     AutoOrMan = T.AutoOrMan,
                                                     Apply = T.AutoOrMan,
                                                     ApplyID = (T.AutoOrMan == "A" ? 1 : T.AutoOrMan == "M" ? 2 : T.AutoOrMan == "S" ? 3 : 0),
                                                     ProdOrOrd = T.Prod_or_Ord,
                                                     ItemRemarks = T.Item_Remarks,
                                                     LockRow = T.LockRow,
                                                     GenPlanType = T.GenPlanType,
                                                     Amend = T.Amend
                                                 }).AsQueryable();
            return query;
        }

        public IQueryable<AccessoryReqDet> GetAccReqColorSizeDet(int accreqmasid)
        {
            IQueryable<AccessoryReqDet> query = (from T in entities.Acc_Req_Det
                                                 join C in entities.Color on T.AccColorID equals C.Colorid into
                                                 col
                                                 from chk in col.DefaultIfEmpty()
                                                 where T.AccReqMasID == accreqmasid
                                                 select new AccessoryReqDet
                                                 {
                                                     AccReqMasID = (int)T.AccReqMasID,
                                                     AccReqDetID = T.AccReqDetID,
                                                     GarColorID = (int)(T.GarColorID == null ? 0 : T.GarColorID),
                                                     GarSizeID = (int)(T.GarSizeID == null ? 0 : T.GarSizeID),
                                                     GarQty = (int)(T.GarQty == null ? 0 : T.GarQty),
                                                     AccColorID = (int)(T.AccColorID == null ? 0 : T.AccColorID),
                                                     AccSizeID = (int)(T.AccSizeID == null ? 0 : T.AccSizeID),
                                                     QtyPerPiece = (int)(T.QtyPerPiece == null ? 0 : T.QtyPerPiece),
                                                     TotalQty = (T.TotalQty == null ? 0 : T.TotalQty),
                                                     BOMQty = (int)(T.BOMQty == null ? 0 : T.BOMQty),
                                                     LockRow = T.LockRow,
                                                     ItemRem = T.Item_Remarks,
                                                     PColorId = (int)(T.PColorID == null ? 0 : T.PColorID),
                                                     ProcessColor = chk.Colorname,
                                                     PQty = (int)T.PQty,
                                                     ItemCode = T.ItemCode,
                                                     Color = T.Color.Color1
                                                 }).AsQueryable();
            return query;
        }

        public IQueryable<TrimsItemDetails> GetAccorPackDet(string OrderNo, int StyleId, int Itemid)
        {
            IQueryable<TrimsItemDetails> query = (from T in entities.Proc_Apparel_proc_GetAccOrPack_Planning(OrderNo, StyleId, Itemid, "A")
                                                  select new TrimsItemDetails
                                                  {
                                                      AccReqMasID = T.AccReqId,
                                                      Sno = (int)T.Sno,
                                                      ItemName = T.Item,
                                                      ItemId = (int)T.ItemID,
                                                      quantity = (decimal)T.Qty,
                                                      UOM = T.UOM,
                                                      Unitid = (int)T.UnitID,
                                                      Type = (int)T.PlanTypeId,
                                                      PlanType = T.PlanType,
                                                      ApplyID = (int)T.ApplyID,
                                                      Apply = T.ApplyType,
                                                      Rate = (decimal)(T.Rate == null ? 0 : T.Rate),
                                                      ItemRemarks = T.ImRemarks,
                                                      ProdOrOrd = T.Prod_or_Ord,
                                                  }).AsQueryable();
            return query;
        }

        public IQueryable<TrimsSizeDetails> GetTrimsSizeDetails(string OrderNo, int ItemId, int StyleId)
        {
            IQueryable<TrimsSizeDetails> query = (from T in entities.Proc_Apparel_AssignSize(OrderNo, StyleId, ItemId)
                                                  select new TrimsSizeDetails
                                                  {
                                                      Sno = (int)T.Sno,
                                                      OrderNo = T.order_no,
                                                      Item = T.Item,
                                                      ItemId = (int)T.ItemId,
                                                      Size = T.size,
                                                      SizeId = T.sizeid,
                                                      AccSizeId = 0,
                                                      AccSize = "",
                                                      SizeRow = (int)T.SizeRow,
                                                      UOM = T.UOM,
                                                      UomId = T.UOMID,
                                                      ReqQty = T.ReqQty,
                                                      Qty = (int)T.Quantity,
                                                      ProdQty = (int)T.ProductionQty,
                                                      QUnit = T.QtyUnit,
                                                  }).AsQueryable();
            return query;
        }

        public IQueryable<TrimsStyleDetails> GetTrimsStyleDetails(string OrderNo, int ItemId, int StyleId, int AccItemId)
        {
            int PUnitId = 0;
            int AUomId = 0;
            string AUom = "";

            var OQuery = entities.Item.Where(b => b.ItemId == AccItemId).FirstOrDefault();
            if (OQuery != null)
            {
                PUnitId = (int)OQuery.Pur_Unit;
            }

            var OQuery1 = entities.Unit_of_measurement.Where(b => b.UomId == PUnitId).FirstOrDefault();
            if (OQuery1 != null)
            {
                AUomId = (int)OQuery1.UomId;
                AUom = OQuery1.Abbreviation;
            }

            IQueryable<TrimsStyleDetails> query = (from T in entities.Proc_Apparel_AssignStyle(OrderNo, StyleId, ItemId)
                                                   select new TrimsStyleDetails
                                                   {
                                                       Sno = (int)T.Sno,
                                                       OrderNo = T.order_no,
                                                       Item = T.Item,
                                                       ItemId = (int)T.ItemID,
                                                       Size = T.size,
                                                       Color = T.color,
                                                       ColorId = T.colorid,
                                                       SizeId = T.sizeid,
                                                       UOM = AUom,//T.UOM,
                                                       ReqQty = T.ReqQty,
                                                       UomId = AUomId,//T.UOMID,
                                                       OrdQty = (decimal)T.OrdQty,
                                                       Qty = (int)T.OrdQty,
                                                       ProdQty = (decimal)T.PrdQty,
                                                       QUnit = T.QtyUnit,
                                                       PColor = T.color,
                                                       PColorid = T.colorid,
                                                   }).AsQueryable();
            return query;
        }

        //public int AddData(List<Acc_Req_Mas> objAccReqMas)
        //{                       
        //    foreach (var accreqmas in objAccReqMas)
        //    {                
        //        entities.Acc_Req_Mas.Add(accreqmas);
        //    }

        //    entities.SaveChanges();

        //    var accreqmasid=(from n in entities.Acc_Req_Mas
        //    //return result.AccReqMasID;
        //    return true;
        //}

        public IList<TrimsDet> GetBuyOrdBomDet(string OrderNo, int ItemId, int StyleID, int plantype, string applytype)
        {
            IList<TrimsDet> query = (from T in entities.Acc_Req_Det
                                     join B in entities.Acc_Req_Mas on T.AccReqMasID equals B.AccReqMasID
                                     join C in entities.Acc_Req_Style on B.AccReqID equals C.AccReqID
                                     where (B.ItemID == ItemId && C.StyleID == StyleID && C.AccOrPack == "A" && C.Order_No == OrderNo && B.PlanType == plantype && B.AutoOrMan == applytype)
                                     group new { T, B, C } by new { C.Order_No, C.StyleID, B.ItemID, T.AccColorID, T.AccSizeID, C.AccOrPack } into rslt
                                     select new TrimsDet
                                     {
                                         //orderno = C.Order_No,
                                         //styleid = C.StyleID,
                                         //itemid = B.ItemID,
                                         //acccolorid = (int)(T.AccColorID == null ? 0 : T.AccColorID),
                                         //accsizeid = (int)(T.AccSizeID == null ? 0 : T.AccSizeID),
                                         //Accorpack = C.AccOrPack,
                                         //TotalQty = T.TotalQty
                                         orderno = rslt.Key.Order_No,
                                         styleid = rslt.Key.StyleID,
                                         itemid = rslt.Key.ItemID,
                                         acccolorid = (int)(rslt.Key.AccColorID == null ? 0 : rslt.Key.AccColorID),
                                         accsizeid = (int)(rslt.Key.AccSizeID == null ? 0 : rslt.Key.AccSizeID),
                                         Accorpack = rslt.Key.AccOrPack,
                                         TotalQty = rslt.Sum(x => x.T.TotalQty)
                                     }).ToList();
            return query;
        }

        public IList<TrimsDet> GetBuyOrdBomDetforStyleTemp(string OrderNo, int ItemId, int StyleID, int plantype, string applytype, int Colorid, int Sizeid)
        {
            IList<TrimsDet> query = (from T in entities.Acc_Req_Det
                                     join B in entities.Acc_Req_Mas on T.AccReqMasID equals B.AccReqMasID
                                     join C in entities.Acc_Req_Style on B.AccReqID equals C.AccReqID
                                     where (B.ItemID == ItemId && C.StyleID == StyleID && T.AccColorID == Colorid && T.AccSizeID == Sizeid
                                     && C.AccOrPack == "A" && C.Order_No == OrderNo && B.PlanType == plantype && B.AutoOrMan == applytype)
                                     group new { T, B, C } by new { C.Order_No, C.StyleID, B.ItemID, T.AccColorID, T.AccSizeID, C.AccOrPack } into rslt
                                     select new TrimsDet
                                     {
                                         //orderno = C.Order_No,
                                         //styleid = C.StyleID,
                                         //itemid = B.ItemID,
                                         //acccolorid = (int)(T.AccColorID == null ? 0 : T.AccColorID),
                                         //accsizeid = (int)(T.AccSizeID == null ? 0 : T.AccSizeID),
                                         //Accorpack = C.AccOrPack,
                                         //TotalQty = T.TotalQty
                                         orderno = rslt.Key.Order_No,
                                         styleid = rslt.Key.StyleID,
                                         itemid = rslt.Key.ItemID,
                                         acccolorid = (int)(rslt.Key.AccColorID == null ? 0 : rslt.Key.AccColorID),
                                         accsizeid = (int)(rslt.Key.AccSizeID == null ? 0 : rslt.Key.AccSizeID),
                                         Accorpack = rslt.Key.AccOrPack,
                                         TotalQty = rslt.Sum(x => x.T.TotalQty)
                                     }).ToList();
            return query;
        }

        public bool AddData(List<Acc_Req_Mas> objAccReqMas, List<TrimsAccShipDet> accreqship, List<TrimsColorDetails> ComboColorList, List<TrimsSizeDetails> ComboSizeList, List<TrimsStyleDetails> ComboStyleList, string Orderno, DateTime EntryDate, int Styleid, int BuyOrdMasid, int ItemId, int AccColorId, int AccSizeId, int Mode, int PlanId, AccessoryReqMas accreqmasobj)
        {
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                int ItmId = 0;
                int PlId = 0;
                string applytype = string.Empty;

                try
                {
                    //Adding Acc_Req_Style Begin
                    var accreqstyle = new Acc_Req_Style();
                    var accordbommas = new Buy_Ord_BOMMas();
                    var accordbomdet = new Buy_Ord_BOMDet();
                    var PlanAdd = new Planning_Mas();
                    List<TrimsGenAuto> trimsgenautolst = new List<TrimsGenAuto>();
                    List<TrimsGenAuto> trimsgenmanuallst = new List<TrimsGenAuto>();

                    var Accreqid = 0;
                    var plantype = 0;
                    var companyid = 0;
                    var Buyerid = 0;
                    var Buyordsty = entities.Acc_Req_Style.Where(d => d.Order_No == Orderno && d.StyleID == Styleid && d.StyleItemID == ItemId).FirstOrDefault();

                    if (Buyordsty == null)
                    {
                        accreqstyle.Order_No = Orderno;
                        accreqstyle.BuyOrdMasId = BuyOrdMasid;
                        accreqstyle.StyleID = Styleid;
                        accreqstyle.StyleItemID = ItemId;
                        accreqstyle.EntryDate = EntryDate;//Convert.ToDateTime("2018-01-03");
                        accreqstyle.BuyOrJob = "B";
                        accreqstyle.AccOrPack = "A";
                        accreqstyle.Amend = "N";

                        var buyordmasid = entities.Acc_Req_Style.Add(accreqstyle);
                        entities.SaveChanges();
                        Accreqid = buyordmasid.AccReqID;
                    }
                    else
                    {
                        Accreqid = Buyordsty.AccReqID;
                    }
                    //Adding Acc_Req_Style End            

                    //Adding Acc_Req_Mas and Det Begin
                    foreach (var accreqmas in objAccReqMas)
                    {
                        plantype = (int)accreqmas.PlanType;
                        applytype = accreqmas.AutoOrMan;

                        var accreMasId = 0;
                        decimal totqtybyrec = 0;

                        if (accreqmas.AutoOrMan == "S")
                        {
                            applytype = accreqmas.AutoOrMan;

                            foreach (var accreqshipmas in accreqship)
                            {

                                if (accreqmasobj.GenShipmentList != null && accreqmasobj.GenShipmentList.Count > 0 && Mode == 0)
                                {
                                    foreach (var accreqdet in accreqmasobj.GenShipmentList)
                                    {
                                        if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                                        {
                                            totqtybyrec = totqtybyrec + accreqdet.TotQty;
                                        }
                                    }
                                }

                                Acc_Req_Mas accreq = new Acc_Req_Mas();

                                accreq.ShipRowID = accreqshipmas.shiprowid;
                                accreq.AccReqID = Accreqid;
                                accreq.ItemID = accreqmas.ItemID;
                                accreq.Allowance = accreqmas.Allowance;
                                accreq.UnitId = accreqmas.UnitId;
                                ItmId = accreqmas.ItemID;
                                //accreq.Quantity = (accreqmasobj.GenShipmentList.Count>0?totqtybyrec: accreqmas.Quantity);
                                accreq.Quantity = accreqmas.Quantity;
                                accreq.PlanType = accreqmas.PlanType;
                                accreq.DivMul = accreqmas.DivMul;
                                accreq.AutoOrMan = accreqmas.AutoOrMan;
                                accreq.Prod_or_Ord = accreqmas.Prod_or_Ord;
                                accreq.Item_Remarks = accreqmas.Item_Remarks;
                                accreq.Add_Date = accreqmas.Add_Date;
                                accreq.LockRow = accreqmas.LockRow;
                                accreq.GenPlanType = accreqmas.GenPlanType;
                                accreq.Amend = accreqmas.Amend;
                                accreq.CreatedBy = accreqmas.CreatedBy;

                                //accreqmas.ShipRowID = accreqshipmas.shiprowid;
                                //accreqmas.AccReqID = Accreqid;
                                //ItmId = accreqmas.ItemID;
                                var id = entities.Acc_Req_Mas.Add(accreq);
                                entities.SaveChanges();
                                accreMasId = id.AccReqMasID;

                                var objAccReqDet = new Acc_Req_Det();
                                decimal? QtyUnit = null;
                                int? PColorId = null;
                                int? accsizeid = null;
                                int? acccolorid = null;

                                if (ComboColorList != null && ComboColorList.Count > 0 && Mode == 0)
                                {
                                    foreach (var accreqdet in ComboColorList)
                                    {
                                        if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                                        {
                                            objAccReqDet.AccReqMasID = accreMasId;
                                            objAccReqDet.GarColorID = (accreqdet.ColorId == 0 ? 0 : accreqdet.ColorId);
                                            objAccReqDet.AccColorID = (accreqdet.ReqColorId == 0 ? 0 : accreqdet.ReqColorId);
                                            objAccReqDet.AccSizeID = (AccSizeId == 0 ? accsizeid : AccSizeId);
                                            objAccReqDet.QtyPerPiece = (accreqdet.QUnit == 0 ? 0 : accreqdet.QUnit);
                                            objAccReqDet.TotalQty = accreqdet.ReqQty;
                                            objAccReqDet.BOMQty = 0;// accreqdet.ReqQty;
                                            objAccReqDet.PColorID = (accreqdet.PColorid == 0 ? PColorId : accreqdet.PColorid);
                                            objAccReqDet.PQty = accreqdet.ProcessQty;
                                            //objAccReqDet.ItemCode = (accreqdet.ItemCode == "" ? ItemCode : accreqdet.ItemCode);
                                            objAccReqDet.GarQty = accreqdet.Qty;

                                            entities.Acc_Req_Det.Add(objAccReqDet);
                                            entities.SaveChanges();
                                        }
                                    }
                                }

                                if (ComboSizeList != null && ComboSizeList.Count > 0 && Mode == 0)
                                {
                                    foreach (var accreqdet in ComboSizeList)
                                    {
                                        if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                                        {
                                            objAccReqDet.AccReqMasID = accreMasId;
                                            objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                            objAccReqDet.AccSizeID = (accreqdet.AccSizeId == 0 ? 0 : accreqdet.AccSizeId);
                                            objAccReqDet.AccColorID = (AccColorId == 0 ? acccolorid : AccColorId);
                                            objAccReqDet.QtyPerPiece = (accreqdet.QUnit == 0 ? 0 : accreqdet.QUnit);
                                            objAccReqDet.GarQty = accreqdet.Qty;
                                            objAccReqDet.TotalQty = accreqdet.ReqQty;
                                            objAccReqDet.BOMQty = 0;
                                            //objAccReqDet.PColorID = accreqdet.PColorId;
                                            //objAccReqDet.PQty = accreqdet.PQty;
                                            //objAccReqDet.ItemCode = accreqdet.ItemCode;

                                            entities.Acc_Req_Det.Add(objAccReqDet);
                                            entities.SaveChanges();
                                        }
                                    }
                                }

                                if (ComboStyleList != null && ComboStyleList.Count > 0 && Mode == 0)
                                {
                                    foreach (var accreqdet in ComboStyleList)
                                    {
                                        if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                                        {
                                            objAccReqDet.AccReqMasID = accreMasId;
                                            objAccReqDet.GarColorID = (accreqdet.ColorId == 0 ? 0 : accreqdet.ColorId);
                                            objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                            objAccReqDet.AccColorID = (accreqdet.ColorId == 0 ? 0 : accreqdet.ColorId);
                                            objAccReqDet.AccSizeID = (accreqdet.AccSizeId == 0 ? 0 : accreqdet.AccSizeId);
                                            objAccReqDet.QtyPerPiece = (accreqdet.QUnit == 0 ? 0 : accreqdet.QUnit);
                                            objAccReqDet.GarQty = accreqdet.OrdQty;
                                            objAccReqDet.TotalQty = accreqdet.ReqQty;
                                            objAccReqDet.BOMQty = 0;
                                            //objAccReqDet.PColorID = accreqdet.PColorId;
                                            objAccReqDet.PQty = accreqdet.ProcessQty;
                                            //objAccReqDet.ItemCode = accreqdet.ItemCode;

                                            entities.Acc_Req_Det.Add(objAccReqDet);
                                            entities.SaveChanges();
                                        }
                                    }
                                }

                                if (accreqmasobj.GenAutoList != null && accreqmasobj.GenAutoList.Count > 0 && Mode == 0)
                                {
                                    foreach (var accreqdet in accreqmasobj.GenAutoList)
                                    {
                                        if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                                        {
                                            objAccReqDet.AccReqMasID = accreMasId;
                                            //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                            objAccReqDet.AccSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                            objAccReqDet.AccColorID = (accreqdet.ColorId == 0 ? acccolorid : accreqdet.ColorId);
                                            objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? 0 : accreqdet.QtyPerPiece);
                                            objAccReqDet.GarQty = accreqdet.GarQty;
                                            objAccReqDet.TotalQty = accreqdet.TotQty;
                                            objAccReqDet.BOMQty = 0;

                                            entities.Acc_Req_Det.Add(objAccReqDet);
                                            entities.SaveChanges();
                                        }
                                    }
                                }

                                if (accreqmasobj.GenManualList != null && accreqmasobj.GenManualList.Count > 0 && Mode == 0)
                                {
                                    foreach (var accreqdet in accreqmasobj.GenManualList)
                                    {
                                        if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                                        {
                                            objAccReqDet.AccReqMasID = accreMasId;
                                            //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                            objAccReqDet.AccSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                            objAccReqDet.AccColorID = (accreqdet.ColorId == 0 ? acccolorid : accreqdet.ColorId);
                                            objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? 0 : accreqdet.QtyPerPiece);
                                            objAccReqDet.GarQty = accreqdet.GarQty;
                                            objAccReqDet.TotalQty = accreqdet.TotQty;
                                            objAccReqDet.BOMQty = 0;

                                            entities.Acc_Req_Det.Add(objAccReqDet);
                                            entities.SaveChanges();
                                        }
                                    }
                                }

                                if (accreqmasobj.GenShipmentList != null && accreqmasobj.GenShipmentList.Count > 0 && Mode == 0)
                                {
                                    foreach (var accreqdet in accreqmasobj.GenShipmentList)
                                    {
                                        if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                                        {
                                            objAccReqDet.AccReqMasID = accreMasId;
                                            //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                            objAccReqDet.AccSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                            objAccReqDet.AccColorID = (accreqdet.ColorId == 0 ? acccolorid : accreqdet.ColorId);
                                            objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? 0 : accreqdet.QtyPerPiece);
                                            objAccReqDet.GarQty = accreqdet.GarQty;
                                            objAccReqDet.TotalQty = accreqdet.TotQty;
                                            objAccReqDet.BOMQty = 0;

                                            entities.Acc_Req_Det.Add(objAccReqDet);
                                            entities.SaveChanges();
                                        }
                                    }
                                }
                                totqtybyrec = 0;
                            }
                        }
                        else
                        {
                            accreqmas.AccReqID = Accreqid;
                            ItmId = accreqmas.ItemID;
                            var id = entities.Acc_Req_Mas.Add(accreqmas);
                            entities.SaveChanges();
                            accreMasId = id.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();
                            //decimal? QtyUnit = null;
                            int? PColorId = null;
                            int? accsizeid = null;
                            int? acccolorid = null;

                            if (ComboColorList != null && ComboColorList.Count > 0 && Mode == 0)
                            {
                                foreach (var accreqdet in ComboColorList)
                                {
                                    objAccReqDet.AccReqMasID = accreMasId;
                                    objAccReqDet.GarColorID = (accreqdet.ColorId == 0 ? 0 : accreqdet.ColorId);
                                    objAccReqDet.AccColorID = (accreqdet.ReqColorId == 0 ? 0 : accreqdet.ReqColorId);
                                    objAccReqDet.AccSizeID = (AccSizeId == 0 ? accsizeid : AccSizeId);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QUnit == 0 ? 0 : accreqdet.QUnit);
                                    objAccReqDet.TotalQty = accreqdet.ReqQty;
                                    objAccReqDet.BOMQty = 0;// accreqdet.ReqQty;
                                    objAccReqDet.PColorID = (accreqdet.PColorid == 0 ? PColorId : accreqdet.PColorid);
                                    objAccReqDet.PQty = accreqdet.ProcessQty;
                                    //objAccReqDet.ItemCode = (accreqdet.ItemCode == "" ? ItemCode : accreqdet.ItemCode);
                                    objAccReqDet.GarQty = accreqdet.Qty;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();
                                }
                            }

                            if (ComboSizeList != null && ComboSizeList.Count > 0 && Mode == 0)
                            {
                                foreach (var accreqdet in ComboSizeList)
                                {
                                    objAccReqDet.AccReqMasID = accreMasId;
                                    objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccSizeID = (accreqdet.AccSizeId == 0 ? 0 : accreqdet.AccSizeId);
                                    objAccReqDet.AccColorID = (AccColorId == 0 ? acccolorid : AccColorId);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QUnit == 0 ? 0 : accreqdet.QUnit);
                                    objAccReqDet.GarQty = accreqdet.Qty;
                                    objAccReqDet.TotalQty = accreqdet.ReqQty;
                                    objAccReqDet.BOMQty = 0;
                                    //objAccReqDet.PColorID = accreqdet.PColorId;
                                    //objAccReqDet.PQty = accreqdet.PQty;
                                    //objAccReqDet.ItemCode = accreqdet.ItemCode;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();
                                }
                            }

                            if (ComboStyleList != null && ComboStyleList.Count > 0 && Mode == 0)
                            {
                                foreach (var accreqdet in ComboStyleList)
                                {
                                    objAccReqDet.AccReqMasID = accreMasId;
                                    objAccReqDet.GarColorID = (accreqdet.ColorId == 0 ? 0 : accreqdet.ColorId);
                                    objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccColorID = (accreqdet.ColorId == 0 ? 0 : accreqdet.PColorid);
                                    objAccReqDet.AccSizeID = (accreqdet.AccSizeId == 0 ? 0 : accreqdet.AccSizeId);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QUnit == 0 ? 0 : accreqdet.QUnit);
                                    objAccReqDet.GarQty = accreqdet.OrdQty;
                                    objAccReqDet.TotalQty = accreqdet.ReqQty;
                                    objAccReqDet.BOMQty = 0;
                                    //objAccReqDet.PColorID = accreqdet.PColorId;
                                    objAccReqDet.PQty = accreqdet.ProcessQty;
                                    //objAccReqDet.ItemCode = accreqdet.ItemCode;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();
                                }
                            }

                            if (accreqmasobj.GenAutoList != null && accreqmasobj.GenAutoList.Count > 0 && Mode == 0)
                            {
                                foreach (var accreqdet in accreqmasobj.GenAutoList)
                                {
                                    objAccReqDet.AccReqMasID = accreMasId;
                                    //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccColorID = (accreqdet.ColorId == 0 ? acccolorid : accreqdet.ColorId);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? 0 : accreqdet.QtyPerPiece);
                                    objAccReqDet.GarQty = accreqdet.GarQty;
                                    objAccReqDet.TotalQty = accreqdet.TotQty;
                                    objAccReqDet.BOMQty = 0;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();
                                }
                            }

                            if (accreqmasobj.GenManualList != null && accreqmasobj.GenManualList.Count > 0 && Mode == 0)
                            {
                                foreach (var accreqdet in accreqmasobj.GenManualList)
                                {
                                    objAccReqDet.AccReqMasID = accreMasId;
                                    //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccColorID = (accreqdet.ColorId == 0 ? acccolorid : accreqdet.ColorId);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? 0 : accreqdet.QtyPerPiece);
                                    objAccReqDet.GarQty = accreqdet.GarQty;
                                    objAccReqDet.TotalQty = accreqdet.TotQty;
                                    objAccReqDet.BOMQty = 0;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();
                                }
                            }
                        }
                    }

                    var OQueryB = entities.Buy_Ord_Mas.Where(b => b.Buy_Ord_MasId == BuyOrdMasid).FirstOrDefault();
                    if (OQueryB != null)
                    {
                        companyid = (int)OQueryB.CompanyId;
                        BuyOrdMasid = (int)OQueryB.Buy_Ord_MasId;
                        Buyerid = (int)OQueryB.BuyerId;
                    }
                    //Adding Acc_Req_Mas and Det End

                    int Buy_ordBomMasId = 0;
                    if (Mode == 0)
                    {
                        var BuyordBomMas = entities.Buy_Ord_BOMMas.Where(d => d.Order_No == Orderno && d.Styleid == Styleid && d.Access_Type == "A").FirstOrDefault();
                        if (BuyordBomMas == null)
                        {
                            //Adding Buy_Ord_BOMMas Begin
                            accordbommas.Order_No = Orderno;
                            accordbommas.Styleid = Styleid;
                            accordbommas.Access_Type = "A";
                            accordbommas.Order_Qty = 0;
                            accordbommas.ToJob = 0;
                            accordbommas.ByJob = 0;
                            accordbommas.Prog_thru = "A";
                            accordbommas.Companyid = companyid;
                            accordbommas.ToWork = 0;
                            accordbommas.seqno = null;

                            var buyordbommasid = entities.Buy_Ord_BOMMas.Add(accordbommas);
                            entities.SaveChanges();

                            Buy_ordBomMasId = buyordbommasid.Buy_Ord_BOMid;
                        }
                        else
                        {
                            Buy_ordBomMasId = BuyordBomMas.Buy_Ord_BOMid;
                        }

                        //IList<TrimsDet> tsttrimdet;
                        //tsttrimdet = GetBuyOrdBomDet(Orderno, ItmId, Styleid, plantype);
                        var bomdet = GetBuyOrdBomDet(Orderno, ItmId, Styleid, plantype, applytype);

                        if (bomdet.Count > 0)
                        {
                            foreach (var bomdetinfo in bomdet)
                            {
                                int? PID = 0;

                                var exists = entities.Buy_Ord_BOMDet.Where(n => n.Itemid == bomdetinfo.itemid && n.Colorid == bomdetinfo.acccolorid && n.Sizeid == bomdetinfo.accsizeid && n.Buy_Ord_BOMid == Buy_ordBomMasId).FirstOrDefault();

                                if (exists != null)
                                {
                                    exists.Prg_qty = bomdetinfo.TotalQty;
                                    exists.BOM_qty = bomdetinfo.TotalQty;

                                    accordbomdet.EntryDate = DateTime.Now;
                                    entities.SaveChanges();
                                }

                                else
                                {


                                    accordbomdet.Buy_Ord_BOMid = Buy_ordBomMasId;
                                    accordbomdet.Itemid = bomdetinfo.itemid;
                                    accordbomdet.Colorid = (bomdetinfo.acccolorid == 0 ? (int?)null : bomdetinfo.acccolorid);
                                    accordbomdet.Sizeid = (bomdetinfo.accsizeid == 0 ? (int?)null : bomdetinfo.accsizeid);

                                    var uomid = entities.Item.Where(d => d.ItemId == bomdetinfo.itemid).FirstOrDefault();
                                    // var imrate = entities.Item_Rate.Where(d => d.Itemid == bomdetinfo.itemid && d.ColorId == bomdetinfo.colorid && d.SizeId == bomdetinfo.sizeid && d.Buyerid == Buyerid).FirstOrDefault();
                                    accordbomdet.UOMid = (int)uomid.Bas_Unit;
                                    //accordbomdet.SupplierId = (int)imrate.SupplierId;
                                    //var imrate = entities.Item_Rate.Where(d => d.Itemid == bomdetinfo.itemid && d.ColorId == bomdetinfo.acccolorid && d.SizeId == bomdetinfo.accsizeid && d.Buyerid == Buyerid).FirstOrDefault();
                                    //if (imrate != null)
                                    //{


                                    //    if (imrate.SupplierId == 0)
                                    //    {
                                    //        PID = null;
                                    //    }
                                    //    else
                                    //    {
                                    //        PID = imrate.SupplierId;
                                    //    }

                                    //    accordbomdet.SupplierId = PID;
                                    //}
                                    accordbomdet.Prg_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Order_qty = 0;
                                    accordbomdet.Received_qty = 0;
                                    accordbomdet.Issue_qty = 0;
                                    accordbomdet.Adjust_Qty = 0;
                                    accordbomdet.BOM_qty = bomdetinfo.TotalQty;
                                    accordbomdet.Pur_UOMid = uomid.Bas_Unit;
                                    accordbomdet.ToPurUOM = 1;
                                    accordbomdet.Conv_Mode = "M";
                                    accordbomdet.PurForJob = "N";
                                    accordbomdet.Debit_qty = 0;
                                    accordbomdet.Transfer_In = 0;
                                    accordbomdet.Transfer_Out = 0;
                                    accordbomdet.Cancel_Qty = 0;
                                    accordbomdet.CSP = "N";
                                    accordbomdet.AltItem = "N";
                                    accordbomdet.ItemClosure = "N";
                                    accordbomdet.EntryDate = DateTime.Now;
                                    accordbomdet.ItemRemarks = "";
                                    accordbomdet.StockOut = 0;

                                    entities.Buy_Ord_BOMDet.Add(accordbomdet);
                                    entities.SaveChanges();
                                }
                            }
                        }
                        //Adding Buy_Ord_BOMMas End
                    }

                    //

                    //Check the Planning Entry Made
                    var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == Orderno && b.StyleID == Styleid && b.CompanyID == companyid && b.ItemID == ItemId).FirstOrDefault();
                    if (OQueryP != null)
                    {
                        PlId = OQueryP.PlanID;

                        if (PlId > 0)
                        {
                            var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                            if (AppMas != null)
                            {
                                AppMas.Acc_Plan = "E";
                            }
                            entities.SaveChanges();
                        }
                    }
                    else
                    {
                        if (PlId == 0)
                        {
                            PlanAdd.CompanyID = companyid;
                            PlanAdd.Buy_Ord_MasId = BuyOrdMasid;
                            PlanAdd.Order_No = Orderno;
                            PlanAdd.StyleID = Styleid;
                            PlanAdd.ItemID = ItemId;
                            PlanAdd.Acc_Plan = "E";
                            PlanAdd.Pack_Plan = "N";
                            PlanAdd.Con_Plan = "N";
                            PlanAdd.Fabric_Plan = "N";
                            PlanAdd.Yarn_Plan = "N";
                            var id = entities.Planning_Mas.Add(PlanAdd);
                            entities.SaveChanges();
                        }
                    }
                    //
                    //insert for Prg summ table
                    var result3 = entities.Proc_Apparel_GetPlanInsertAccPrgSumDetails(Orderno, Styleid);
                    entities.SaveChanges();
                    //
                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Trims-AddData");
                    return false;
                    throw ex;
                }
            }
        }

        public IList<TrimsColorDetails> GetTrimsColorDetails(string OrderNo, int ItemId, int StyleId)
        {
            //IQueryable<TrimsColorDetails> queryColor = (from T in entities.Proc_Apparel_AssignColorSize("COLOR", OrderNo, StyleId, ItemId)            
            IQueryable<TrimsColorDetails> queryColor = (from T in entities.Proc_Apparel_AssignColor(OrderNo, StyleId, ItemId)
                                                        select new TrimsColorDetails
                                                        {
                                                            Sno = (int)T.Sno,
                                                            OrderNo = T.order_no,
                                                            Item = T.Item,
                                                            ItemId = (int)T.ItemId,
                                                            Color = T.color,
                                                            ColorId = T.colorid,
                                                            UOM = T.UOM,
                                                            UomId = T.UOMID,
                                                            Qty = (int)T.Quantity,
                                                            PQty = (int)T.ProcessQty,
                                                            QUnit = T.QUnit,
                                                            ReqQty = T.ReqQty,
                                                            ReqColorId = T.colorid,
                                                            ReqColor = T.color,
                                                            ProdQty = (decimal)T.ProductionQty,
                                                        }).AsQueryable();

            return queryColor.ToList();
        }

        //Color-Ship in Add Mode
        public IList<TrimsColorDetails> GetAssignShipColorSize(string Type, string OrderNo, int ItemId, int StyleId)
        {
            IQueryable<TrimsColorDetails> queryColor = (from T in entities.Proc_Apparel_AssignShipColorSize(Type, OrderNo, StyleId, ItemId)
                                                        select new TrimsColorDetails
                                                        {
                                                            Sno = (int)T.Sno,
                                                            ShipRowId = (int)T.shiprow,
                                                            OrderNo = T.order_no,
                                                            Item = T.Item,
                                                            ItemId = (int)T.ItemID,
                                                            Color = T.color,
                                                            ColorId = T.colorid,
                                                            Size = T.size,
                                                            SizeId = T.sizeid,
                                                            UOM = T.UOM,
                                                            UomId = T.UOMID,
                                                            Qty = (int)T.Quantity,
                                                            PQty = (int)T.ProductionQty,
                                                            ProdQty = (int)T.ProductionQty,
                                                            QUnit = 0,
                                                            ReqColorId = T.colorid,
                                                            ReqColor = T.color,


                                                            //Sno = (int)T.Sno,
                                                            //OrderNo = T.order_no,
                                                            //Item = T.Item,
                                                            //ItemId = (int)T.ItemId,
                                                            //Color = T.color,
                                                            //ColorId = T.colorid,
                                                            //UOM = T.UOM,
                                                            //UomId = T.UOMID,
                                                            //Qty = (int)T.Quantity,
                                                            //PQty = (int)T.ProcessQty,
                                                            //QUnit = T.QUnit,
                                                            //ReqQty = T.ReqQty,
                                                            //ReqColorId = T.colorid,
                                                            //ReqColor = T.color,
                                                            //ProdQty = (decimal)T.ProductionQty,

                                                        }).AsQueryable();

            return queryColor.ToList();
        }
        public IList<TrimsColorDetails> GetTrimsColorDetailsForEdit(string OrderNo, int ItemId, int StyleItemId, int StyleId, int PlanType, string applytype)
        {
            //IQueryable<TrimsColorDetails> queryColor = (from T in entities.Proc_Apparel_AssignColorSize("COLOR", OrderNo, StyleId, ItemId)            
            string apptype = (applytype == "Auto" ? "A" : applytype == "Manual" ? "M" : applytype == "Shipment" ? "S" : "S");

            IQueryable<TrimsColorDetails> queryColor = (from T in entities.Proc_Apparel_GetAccColorPlan(apptype, "A", OrderNo, StyleId, StyleItemId, ItemId, PlanType)
                                                        select new TrimsColorDetails
                                                        {
                                                            Sno = (int)T.Sno,
                                                            Allow = (int)T.Allowance,
                                                            DivOrMul = T.DivOrMul,
                                                            //OrderNo = T.order_no,
                                                            ShipRowId = (int)T.shiprowid,
                                                            AccReqDetId = T.AccReqDetID,
                                                            Item = T.Item,
                                                            ItemId = (int)T.Itemid,
                                                            Color = T.GColor,
                                                            ColorId = T.GColorid,
                                                            ReqColorId = T.AColorid,
                                                            ReqColor = T.AColor,
                                                            UOM = T.Unit,
                                                            UomId = (int)T.UOMid,
                                                            Qty = (int)T.GQty,
                                                            PQty = (int)T.PQty,
                                                            ProcessQty = (int)T.PQty,
                                                            PColor = T.PColor,
                                                            PColorid = T.PColorID,
                                                            QUnit = T.QtyPerPiece,//Convert.ToInt16(T.QtyPerPiece),
                                                            ReqQty = (int)T.TotalQty,
                                                            AccColorId = (int)T.AColorid,
                                                            AccSizeId = (int)T.ASizeid,
                                                            OrdQty = (decimal)T.OrderQty,
                                                            ProdQty = (decimal)T.ProductionQty,
                                                        }).AsQueryable();

            return queryColor.ToList();
        }

        public IList<TrimsGenAuto> GetTrimsGeneralDetForEdit(string ApplyType, string OrderNo, int ItemId, int StyleItemId, int StyleId, int PlanTypeId)
        {
            IQueryable<TrimsGenAuto> queryColor = (from T in entities.Proc_Apparel_GetAccGeneralPlan(ApplyType, "A", OrderNo, StyleId, StyleItemId, ItemId, PlanTypeId)
                                                   select new TrimsGenAuto
                                                   {
                                                       Sno = (int)T.Sno,
                                                       Allow = (int)T.Allowance,
                                                       DivOrMul = T.DivOrMul,
                                                       //OrderNo = T.order_no,
                                                       ShipRowId = (int)T.shiprowid,
                                                       AccReqDetId = T.AccReqDetID,
                                                       Item = T.Item,
                                                       ItemId = (int)T.Itemid,
                                                       ColorName = T.AColor,
                                                       ColorId = T.AColorid,
                                                       UomName = T.Unit,
                                                       UomId = (int)T.UOMid,
                                                       GarQty = (int)T.GQty,
                                                       //PQty = (int)T.GQty,                                                            
                                                       QtyPerPiece = T.QtyPerPiece,// Convert.ToInt16(T.QtyPerPiece),
                                                       TotQty = (int)T.TotalQty,
                                                       SizeId = (int)T.ASizeid,
                                                       SizeName = T.ASize,
                                                       OrdQty = (decimal)T.OrderQty,
                                                       CheckPoMade = T.CheckPoMade,
                                                       ReqColorId = 0,
                                                       ReqSizeId = 0,

                                                   }).AsQueryable();

            return queryColor.ToList();
        }

        public IList<TrimsAccShipDet> GetAccShipDet(string Type, string OrderNo, int ItemId, int StyleId)
        {
            IQueryable<TrimsAccShipDet> queryColor = (from T in entities.Proc_Apparel_GetAccShipHeaDet(Type, OrderNo, StyleId, ItemId)
                                                      select new TrimsAccShipDet
                                                      {
                                                          shiprowid = (int)T.ShipRowID,
                                                          assortno = T.AssortNo,
                                                          shipdate = (DateTime)T.Ship_Date,
                                                          destination = T.Destination,
                                                          qty = (decimal)T.Quantity,
                                                          prodqty = (decimal)T.ProductionQty,
                                                          bomQty = (decimal)T.BOQty,
                                                          bpqty = (decimal)T.BPQty
                                                      }).AsQueryable();
            return queryColor.ToList();
        }

        public IList<TrimsSizeDetails> GetTrimsSizeDetailsForEdit(string OrderNo, int ItemId, int StyleId, int PlanType, int applyid, int StyleItemid)
        {
            IQueryable<TrimsSizeDetails> querySize = (from T in entities.Proc_Apparel_GetAccSizeOnEdit(OrderNo, StyleId, ItemId, applyid, StyleItemid)
                                                      select new TrimsSizeDetails
                                                      {
                                                          Sno = (int)T.Sno,
                                                          Allow = (int)T.Allowance,
                                                          DivOrMul = T.DivMul,
                                                          ShipRowId = (int)T.shiprowid,
                                                          OrderNo = T.order_no,
                                                          AccReqDetId = T.AccReqDetID,
                                                          AccColorId = (int)T.AccColorID,
                                                          AccSize = T.AccSize,
                                                          AccSizeId = (int)T.AccSizeID,
                                                          Item = T.Item,
                                                          ItemId = (int)T.ItemId,
                                                          Size = T.size,
                                                          SizeId = T.sizeid,
                                                          UOM = T.UOM,
                                                          UomId = (int)T.UOMID,
                                                          Qty = (int)T.Quantity,
                                                          QUnit = (decimal)T.QtyPerPiece,
                                                          ReqQty = (int)T.TotalQty,//(int)(T.Quantity * T.QtyPerPiece),//T.ProductionQty,
                                                          OAccSizeId = (int)T.AccSizeID,
                                                          CheckPoMade = T.CheckPoMade,
                                                          ProdQty = (decimal)T.ProductionQty,
                                                          OrdQty=(decimal)T.OrderQty
                                                      }).AsQueryable();

            return querySize.ToList();
        }

        public IList<TrimsStyleDetails> GetTrimsStyleDetailsForEdit(string OrderNo, int ItemId, int StyleId, int StyleItemid)
        {
            IQueryable<TrimsStyleDetails> queryStyle = (from T in entities.Proc_Apparel_GetAccStyleOnEdit(OrderNo, StyleId, ItemId, StyleItemid)
                                                        select new TrimsStyleDetails
                                                        {
                                                            Sno = (int)T.Sno,
                                                            ShipRowId = (int)T.ShipRowID,
                                                            OrderNo = T.order_no,
                                                            AccReqDetId = T.AccReqDetID,
                                                            Item = T.Item,
                                                            ItemId = (int)T.ItemID,
                                                            Size = T.size,
                                                            Color = T.color,
                                                            Qty = (int)T.OrdQty,
                                                            QUnit = (decimal)T.Qty,
                                                            ColorId = T.colorid,
                                                            SizeId = T.sizeid,
                                                            UOM = T.UOM,
                                                            ProcessQty = (decimal)T.PQty,
                                                            ReqQty = (int)T.TotalQty,
                                                            UomId = T.UOMID,
                                                            OrdQty = (decimal)T.OrdQty,
                                                            ProdQty = (decimal)T.PrdQty,
                                                            PColorid = (int)T.AccColorID,
                                                            AccSize = T.AccSize,
                                                            AccSizeId = T.AccSizeId,
                                                            OAccColorId = (int)T.AccColorID,
                                                            OAccSizeId = T.AccSizeId,
                                                            PColor = entities.Color.Where(d => d.Colorid == T.AccColorID).Select(r => r.Colorname).FirstOrDefault(),
                                                            CheckPoMade = T.CheckPoMade,
                                                            OrderQty=(decimal)T.OrderQty
                                                        }).AsQueryable();

            return queryStyle.ToList();
        }

        public IQueryable<AccessoryReqMas> Getloadedit(int pid)
        {

            string orderno = "";
            var type = "";
            var styitem = 0;
            var styleid = 0;


            var OQuery = entities.Planning_Mas.Where(b => b.PlanID == pid).FirstOrDefault();
            if (OQuery != null)
            {

                orderno = OQuery.Order_No;
            }
            var OQuery1 = entities.Acc_Req_Style.Where(b => b.Order_No == orderno).FirstOrDefault();
            if (OQuery1 != null)
            {
                type = OQuery1.AccOrPack;
                styitem = (int)OQuery1.StyleItemID;
                styleid = OQuery1.StyleID;

            }

            IQueryable<AccessoryReqMas> query = (from a in entities.proc_GetAccOrPack_EditPlanning(orderno, styleid, styitem, type)
                                                 select new AccessoryReqMas
                                                 {
                                                     AccReqMasID = a.AccReqMasID,
                                                     AccReqID = a.AccReqId,
                                                     ItemId = a.ItemID,
                                                     ItemName = a.Item,
                                                     quantity = (decimal)a.Qty,
                                                     UOM = a.UOM,
                                                     PlanType = a.PlanType,
                                                     Apply = a.ApplyType,
                                                     Amend = a.Amend,



                                                 }).AsQueryable();

            return query;
        }


        public IQueryable<TrimsColorDetails> GetColor()
        {
            IQueryable<TrimsColorDetails> query = (from o in entities.Proc_Apparel_GetColorTrims()
                                                   select new TrimsColorDetails
                                                   {
                                                       ColorId = o.ColorID,
                                                       Color = o.color


                                                   }).AsQueryable();

            return query;
        }

        public IQueryable<TrimsColorDetails> GetSize()
        {
            IQueryable<TrimsColorDetails> query = (from o in entities.Proc_Apparel_GetSizeTrims()
                                                   select new TrimsColorDetails
                                                   {
                                                       SizeId = o.SizeId,
                                                       Size = o.size
                                                   }).AsQueryable();

            return query;
        }
        public IQueryable<TrimsColorDetails> GetFSize()
        {
            IQueryable<TrimsColorDetails> query = (from o in entities.Proc_Apparel_GetSizeFabric()
                                                   select new TrimsColorDetails
                                                   {
                                                       SizeId = o.SizeId,
                                                       Size = o.size
                                                   }).AsQueryable();

            return query;
        }

        public bool DeleteAccess(int id, string orderno, int styleid, List<TrimsColorDetails> ComboColorlst, List<TrimsSizeDetails> ComboSizelst, List<TrimsStyleDetails> ComboStylelst, int Mode, int PlanId, List<TrimsGenAuto> Genauto, List<TrimsGenAuto> GenManual, List<TrimsGenAuto> GenShip)
        {
            var Result = false;
            int PlId = 0;
            int BMasid = 0;
            int Compid = 0;
            var intlist = new List<int> { };
            //var intVar = 4;
            //var exists = list.Contains(intVar);

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //delete Buy_Ord_BOMMas Many Rows table
                    var BuyOrdBomMas = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == orderno && c.Styleid == styleid && c.Access_Type == "A").FirstOrDefault();
                    if (BuyOrdBomMas != null)
                    {
                        if (ComboColorlst != null && ComboColorlst.Count > 0)
                        {
                            foreach (var accreqdet in ComboColorlst)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}


                                var deletebuyordbomcolor = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.AccColorId && d.Sizeid == accreqdet.AccSizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                                deletebuyordbomcolor.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                                entities.SaveChanges();
                            }
                        }

                        if (ComboSizelst != null && ComboSizelst.Count > 0)
                        {
                            foreach (var accreqdet in ComboSizelst)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordbomsize = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.AccColorId && d.Sizeid == accreqdet.AccSizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                                deletebuyordbomsize.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                                entities.SaveChanges();
                            }
                        }

                        if (ComboStylelst != null && ComboStylelst.Count > 0)
                        {
                            foreach (var accreqdet in ComboStylelst)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordbomstyle = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.OAccColorId && d.Sizeid == accreqdet.OAccSizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                                deletebuyordbomstyle.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                                entities.SaveChanges();
                            }
                        }

                        //if (ComboStylelst != null && ComboStylelst.Count > 0)
                        //{
                        //    foreach (var accreqdet in ComboStylelst)
                        //    {
                        //        //if (id == 0)
                        //        //{
                        //        var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                        //        if (res != null)
                        //        {
                        //            id = (int)res.AccReqMasID;

                        //            if (!intlist.Contains(id))
                        //            {
                        //                intlist.Add(id);
                        //            }
                        //        }
                        //        //}
                        //        var deletebuyordbomstyle = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                        //        deletebuyordbomstyle.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                        //        entities.SaveChanges();
                        //    }
                        //}

                        if (Genauto != null && Genauto.Count > 0)
                        {
                            foreach (var accreqdet in Genauto)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordbomstyle = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                                deletebuyordbomstyle.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                                entities.SaveChanges();
                            }
                        }

                        if (GenManual != null && GenManual.Count > 0)
                        {
                            foreach (var accreqdet in GenManual)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordbomstyle = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                                deletebuyordbomstyle.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                                entities.SaveChanges();
                            }
                        }


                        if (GenShip != null && GenShip.Count > 0)
                        {
                            foreach (var accreqdet in GenShip)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordbomstyle = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                                deletebuyordbomstyle.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                                entities.SaveChanges();
                            }
                        }

                        var BuyOrdBomDetInfo = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid).FirstOrDefault();
                        if (BuyOrdBomDetInfo == null)
                        {
                            entities.Buy_Ord_BOMMas.Remove(BuyOrdBomMas);
                            entities.SaveChanges();
                        }
                    }
                    //cost table deleete

                    //delete cost_Ord_Mas Many Rows table
                    var BuyOrdCosMas = entities.Cost_Defn_Mas.Where(c => c.Order_No == orderno && c.styleid == styleid).FirstOrDefault();
                    if (BuyOrdCosMas != null)
                    {
                        if (ComboColorlst != null && ComboColorlst.Count > 0)
                        {
                            foreach (var accreqdet in ComboColorlst)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}


                                var deletebuyordcomcolor = entities.Cost_Defn_BOM.Where(d => d.Cost_Defn_id == BuyOrdCosMas.Cost_Defn_id && d.Colorid == accreqdet.AccColorId && d.Sizeid == accreqdet.AccSizeId && d.Itemid == accreqdet.ItemId).ToList<Cost_Defn_BOM>();
                                deletebuyordcomcolor.ForEach(c => entities.Cost_Defn_BOM.Remove(c));
                                entities.SaveChanges();
                            }
                        }

                        if (ComboSizelst != null && ComboSizelst.Count > 0)
                        {
                            foreach (var accreqdet in ComboSizelst)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordcomsize = entities.Cost_Defn_BOM.Where(d => d.Cost_Defn_id == BuyOrdCosMas.Cost_Defn_id && d.Colorid == accreqdet.AccColorId && d.Sizeid == accreqdet.AccSizeId && d.Itemid == accreqdet.ItemId).ToList<Cost_Defn_BOM>();
                                deletebuyordcomsize.ForEach(c => entities.Cost_Defn_BOM.Remove(c));
                                entities.SaveChanges();
                            }
                        }

                        if (ComboStylelst != null && ComboStylelst.Count > 0)
                        {
                            foreach (var accreqdet in ComboStylelst)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordbcomstyle = entities.Cost_Defn_BOM.Where(d => d.Cost_Defn_id == BuyOrdCosMas.Cost_Defn_id && d.Colorid == accreqdet.OAccColorId && d.Sizeid == accreqdet.OAccSizeId && d.Itemid == accreqdet.ItemId).ToList<Cost_Defn_BOM>();
                                deletebuyordbcomstyle.ForEach(c => entities.Cost_Defn_BOM.Remove(c));
                                entities.SaveChanges();
                            }
                        }


                        if (Genauto != null && Genauto.Count > 0)
                        {
                            foreach (var accreqdet in Genauto)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordcomstyle = entities.Cost_Defn_BOM.Where(d => d.Cost_Defn_id == BuyOrdCosMas.Cost_Defn_id && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Cost_Defn_BOM>();
                                deletebuyordcomstyle.ForEach(c => entities.Cost_Defn_BOM.Remove(c));
                                entities.SaveChanges();
                            }
                        }

                        if (GenManual != null && GenManual.Count > 0)
                        {
                            foreach (var accreqdet in GenManual)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordcomstyle = entities.Cost_Defn_BOM.Where(d => d.Cost_Defn_id == BuyOrdCosMas.Cost_Defn_id && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Cost_Defn_BOM>();
                                deletebuyordcomstyle.ForEach(c => entities.Cost_Defn_BOM.Remove(c));
                                entities.SaveChanges();
                            }
                        }
                        if (GenShip != null && GenShip.Count > 0)
                        {
                            foreach (var accreqdet in GenManual)
                            {
                                //if (id == 0)
                                //{
                                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                if (res != null)
                                {
                                    id = (int)res.AccReqMasID;

                                    if (!intlist.Contains(id))
                                    {
                                        intlist.Add(id);
                                    }
                                }
                                //}
                                var deletebuyordcomstyle = entities.Cost_Defn_BOM.Where(d => d.Cost_Defn_id == BuyOrdCosMas.Cost_Defn_id && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Cost_Defn_BOM>();
                                deletebuyordcomstyle.ForEach(c => entities.Cost_Defn_BOM.Remove(c));
                                entities.SaveChanges();
                            }
                        }
                        var BuyOrdComDetInfo = entities.Cost_Defn_BOM.Where(c => c.Cost_Defn_id == BuyOrdCosMas.Cost_Defn_id).FirstOrDefault();
                        if (BuyOrdComDetInfo == null)
                        {
                            entities.Cost_Defn_Mas.Remove(BuyOrdCosMas);
                            entities.SaveChanges();
                        }
                    }
                    //
                    var OQueryB = entities.Buy_Ord_Mas.Where(b => b.Order_No == orderno).FirstOrDefault();
                    if (OQueryB != null)
                    {
                        Compid = (int)OQueryB.CompanyId;
                        BMasid = (int)OQueryB.Buy_Ord_MasId;
                    }

                    //delete Acc_Req_Mas Many Rows table
                    if (intlist != null && intlist.Count > 0)
                    {
                        foreach (var accreqmas in intlist)
                        {
                            var AccMas = entities.Acc_Req_Mas.Where(c => c.AccReqMasID == accreqmas).FirstOrDefault();
                            if (AccMas != null)
                            {
                                //delete Acc_Req_Det Many Rows table
                                var accreqdet = entities.Acc_Req_Det.Where(c => c.AccReqMasID == AccMas.AccReqMasID).ToList();
                                if (accreqdet != null)
                                {
                                    var deleteaccreqdet = entities.Acc_Req_Det.Where(d => d.AccReqMasID == AccMas.AccReqMasID).ToList<Acc_Req_Det>();
                                    deleteaccreqdet.ForEach(c => entities.Acc_Req_Det.Remove(c));
                                    entities.SaveChanges();

                                    //var tblcount=entities.Acc_Req_Mas.Count(q => q.AccReqMasID != null);

                                    entities.Acc_Req_Mas.Remove(AccMas);
                                    entities.SaveChanges();
                                }

                                var accreqstyleinfo = entities.Acc_Req_Style.Where(c => c.Order_No == orderno && c.StyleID == styleid).FirstOrDefault();
                                if (accreqstyleinfo != null)
                                {
                                    var accreqmasinfo = entities.Acc_Req_Mas.Where(c => c.AccReqID == accreqstyleinfo.AccReqID).FirstOrDefault();

                                    if (accreqmasinfo == null)
                                    {
                                        entities.Acc_Req_Style.Remove(accreqstyleinfo);
                                        entities.SaveChanges();

                                        //delete Acc_Req_Style Many Rows table
                                        //var accreqsty = entities.Acc_Req_Style.Where(c => c.AccReqID == AccMas.AccReqID).FirstOrDefault();
                                        //if (accreqsty != null)
                                        //{
                                        //var deleteaccreqsty = entities.Acc_Req_Style.Where(d => d.AccReqID == accreqsty.AccReqID).ToList<Acc_Req_Style>();
                                        //deleteaccreqsty.ForEach(c => entities.Acc_Req_Style.Remove(c));
                                        //entities.SaveChanges();
                                        //}

                                        //Check the Planning Entry Made
                                        var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == orderno && b.StyleID == styleid && b.CompanyID == Compid && b.Con_Plan == "E").FirstOrDefault();
                                        //var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == orderno && b.StyleID == styleid && b.CompanyID == Compid).FirstOrDefault();
                                        if (OQueryP != null)
                                        {
                                            PlId = OQueryP.PlanID;

                                            if (PlId > 0)
                                            {

                                                var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                                                if (AppMas != null)
                                                {
                                                    AppMas.Acc_Plan = "N";
                                                }
                                                entities.SaveChanges();
                                            }

                                        }
                                        else
                                        {
                                            //var PD = entities.Planning_Mas.Where(w => w.PlanID == PlanId && w.Acc_Plan == "E");
                                            var PD = entities.Planning_Mas.Where(w => w.Order_No == orderno && w.CompanyID == Compid && w.Acc_Plan == "E");
                                            foreach (var C in PD)
                                            {
                                                entities.Planning_Mas.Remove(C);
                                            }
                                            entities.SaveChanges();
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //var OQueryB = entities.Buy_Ord_Mas1.Where(b => b.Order_No == orderno).FirstOrDefault();
                    //if (OQueryB != null)
                    //{
                    //    Compid = (int)OQueryB.CompanyId;
                    //    BMasid = (int)OQueryB.Buy_Ord_MasId;
                    //}

                    ////Check the Planning Entry Made
                    //var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == orderno && b.StyleID == styleid && b.CompanyID == Compid && b.Con_Plan == "E").FirstOrDefault();
                    //if (OQueryP != null)
                    //{
                    //    PlId = OQueryP.PlanID;

                    //    if (PlId > 0)
                    //    {

                    //        var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                    //        if (AppMas != null)
                    //        {
                    //            AppMas.Acc_Plan = "N";
                    //        }
                    //        entities.SaveChanges();
                    //    }

                    //}
                    //else
                    //{
                    //    var PD = entities.Planning_Mas.Where(w => w.PlanID == PlanId && w.Acc_Plan == "E");
                    //    foreach (var C in PD)
                    //    {

                    //        entities.Planning_Mas.Remove(C);

                    //    }
                    //    entities.SaveChanges();
                    //}


                    //insert for Prg summ table
                    var result3 = entities.Proc_Apparel_GetPlanInsertAccPrgSumDetails(orderno, styleid);
                    entities.SaveChanges();
                    //

                    entities.SaveChanges();

                    //The Transaction will be completed
                    txscope.Complete();

                    Result = true;
                    return Result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Trims-DeleteAccess");
                    return false;
                    throw ex;
                }
            }
        }

        public bool UpdateData(AccessoryReqMas objmas)
        {
            var intupdlist = new List<int> { };
            int PlId = 0;
            int ItmId = 0;
            string applytype = string.Empty;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    int AccReqMasId = 0;

                    if (objmas.ComboColorList != null)
                    {
                        //Update TotalQty,PQty in Acc_Req_Det Begin
                        foreach (var accreqmasinfo in objmas.ComboColorList)
                        {
                            var App = entities.Acc_Req_Det.Where(c => c.AccReqDetID == accreqmasinfo.AccReqDetId).FirstOrDefault();

                            //Get AccReqMasID from Acc_Req_Mas
                            if (AccReqMasId == 0 || AccReqMasId != App.AccReqMasID)
                            {
                                if (App != null)
                                {
                                    AccReqMasId = (int)App.AccReqMasID;
                                }
                            }

                            if (App != null)
                            {
                                App.TotalQty = accreqmasinfo.ReqQty;
                                App.PQty = accreqmasinfo.ProcessQty;
                                App.QtyPerPiece = accreqmasinfo.QUnit;
                                App.PColorID = accreqmasinfo.PColorid;
                                App.AccColorID = accreqmasinfo.ReqColorId;
                                App.AccSizeID = objmas.AccSizeID;


                            }
                            entities.SaveChanges();

                            if (objmas != null)
                            {
                                var AppMas = entities.Acc_Req_Mas.Where(c => c.AccReqMasID == AccReqMasId).FirstOrDefault();

                                if (AppMas != null)
                                {
                                    AppMas.Allowance = objmas.Allowance;
                                    AppMas.Prod_or_Ord = objmas.ProdOrOrd;
                                }
                                entities.SaveChanges();
                            }
                        }
                        //Update TotalQty,PQty in Acc_Req_Det End

                        //Update Prg_qty,BOM_qty in Buy_Ord_BOMMas Begin
                        var BuyOrdBomMasUpd = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                        if (BuyOrdBomMasUpd != null)
                        {
                            var BuyOrdBomDetUpd = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid).ToList();

                            if (BuyOrdBomDetUpd != null)
                            {
                                foreach (var accreqmasinfo in objmas.ComboColorList)
                                {
                                    //Update Prg_qty,BOM_qty as 0
                                    foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                    {
                                        if (accreqdetinfo.Colorid == accreqmasinfo.AccColorId && accreqdetinfo.Sizeid == accreqmasinfo.AccSizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = 0;
                                            accreqdetinfo.BOM_qty = 0;
                                        }
                                        entities.SaveChanges();
                                    }
                                }

                                foreach (var accreqmasinfo in objmas.ComboColorList)
                                {
                                    foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                    {
                                        if (accreqdetinfo.Colorid == accreqmasinfo.AccColorId && accreqdetinfo.Sizeid == accreqmasinfo.AccSizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = accreqdetinfo.Prg_qty + accreqmasinfo.ReqQty;

                                            if (accreqdetinfo.Conv_Mode == "D")
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.ReqQty / (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }
                                            else {
                                                decimal reqqty = ((decimal)accreqmasinfo.ReqQty * (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }

                                           // accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.ReqQty;
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }


                        //
                        foreach (var accreqmasinfo1 in objmas.ComboColorList)
                        {

                            var BuyOrdBomMasUpd1 = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                            if (BuyOrdBomMasUpd1 != null)
                            {
                                if (accreqmasinfo1.ShipRowId == 0)
                                {

                                    var BuyOrdBomDetUpd1 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid).ToList();

                                    if (BuyOrdBomDetUpd1 != null)
                                    {
                                        foreach (var accreqdetinfo1 in BuyOrdBomDetUpd1)
                                        {
                                            if (accreqdetinfo1.Colorid == accreqmasinfo1.AccColorId && accreqdetinfo1.Sizeid == accreqmasinfo1.AccSizeId && accreqdetinfo1.Itemid == accreqmasinfo1.ItemId)
                                            {
                                                accreqdetinfo1.Colorid = accreqmasinfo1.ReqColorId;
                                                accreqdetinfo1.Sizeid = objmas.AccSizeID;
                                                entities.SaveChanges();
                                                //accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.ReqQty;
                                            }
                                            else if (accreqmasinfo1.AccReqDetId >0)
                                            {

                                                var BuyOrdBomDetUpd2 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid && c.Colorid == accreqmasinfo1.AccColorId && c.Sizeid == accreqmasinfo1.AccSizeId && c.Itemid == accreqmasinfo1.ItemId).FirstOrDefault();

                                                if (BuyOrdBomDetUpd2 == null)
                                                {
                                                    var Pgsc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, accreqmasinfo1.ItemId, (accreqmasinfo1.ReqColorId == 0 ? accreqmasinfo1.ColorId : accreqmasinfo1.ReqColorId), (objmas.AccSizeID == 0 ? objmas.AccSizeID : objmas.AccSizeID), BuyOrdBomMasUpd1.Buy_Ord_BOMid);
                                                    entities.SaveChanges();
                                                
                                                }

                                              
                                            }
                                            entities.SaveChanges();
                                        }

                                        
                                    }
                                    //var Pgsc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, accreqmasinfo1.ItemId, (accreqmasinfo1.ReqColorId == 0 ? accreqmasinfo1.ColorId : accreqmasinfo1.ReqColorId), (objmas.AccSizeID == 0 ? objmas.AccSizeID : objmas.AccSizeID), BuyOrdBomMasUpd1.Buy_Ord_BOMid);
                                    //entities.SaveChanges();
                                }
                                else
                                {
                                    var Pgsc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, accreqmasinfo1.ItemId, (accreqmasinfo1.ReqColorId == 0 ? accreqmasinfo1.ColorId : accreqmasinfo1.ReqColorId), (objmas.AccSizeID == 0 ? objmas.AccSizeID : objmas.AccSizeID), BuyOrdBomMasUpd1.Buy_Ord_BOMid);
                                    entities.SaveChanges();
                                }
                            }
                        }

                        //insert new color or size in accreqdet


                        int Buy_ordBomMasId = 0;
                        //if (Mode == 0)
                        //{
                        var BuyordBomMas = entities.Buy_Ord_BOMMas.Where(d => d.Order_No == objmas.OrderNo && d.Styleid == objmas.StyleId && d.Access_Type == "A").FirstOrDefault();
                        if (BuyordBomMas == null)
                        {
                            //Adding Buy_Ord_BOMMas Begin
                            //accordbommas.Order_No = objmas.OrderNo;
                            //accordbommas.Styleid = objmas.StyleId;
                            //accordbommas.Access_Type = "A";
                            //accordbommas.Order_Qty = 0;
                            //accordbommas.ToJob = 0;
                            //accordbommas.ByJob = 0;
                            //accordbommas.Prog_thru = "A";
                            //accordbommas.Companyid = companyid;
                            //accordbommas.ToWork = 0;
                            //accordbommas.seqno = null;

                            //var buyordbommasid = entities.Buy_Ord_BOMMas.Add(accordbommas);
                            //entities.SaveChanges();

                            // Buy_ordBomMasId = buyordbommasid.Buy_Ord_BOMid;
                        }
                        else
                        {
                            Buy_ordBomMasId = BuyordBomMas.Buy_Ord_BOMid;
                        }

                        var objAccReqDet = new Acc_Req_Det();
                        //decimal? QtyUnit = null;
                        int? PColorId = null;
                        int? accsizeid = null;
                        //int? acccolorid = null;

                        if (objmas.ComboColorList != null && objmas.ComboColorList.Count > 0)
                        {
                            foreach (var accreqdet in objmas.ComboColorList)
                            {
                                if (accreqdet.AccReqDetId == 0)
                                {
                                    objAccReqDet.AccReqMasID = AccReqMasId;
                                    objAccReqDet.GarColorID = (accreqdet.ColorId == 0 ? 0 : accreqdet.ColorId);
                                    objAccReqDet.AccColorID = (accreqdet.ReqColorId == 0 ? 0 : accreqdet.ReqColorId);
                                    objAccReqDet.AccSizeID = (objmas.AccSizeID == 0 ? accsizeid : objmas.AccSizeID);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QUnit == 0 ? 0 : accreqdet.QUnit);
                                    objAccReqDet.TotalQty = accreqdet.ReqQty;
                                    objAccReqDet.BOMQty = 0;// accreqdet.ReqQty;
                                    objAccReqDet.PColorID = (accreqdet.PColorid == 0 ? PColorId : accreqdet.PColorid);
                                    objAccReqDet.PQty = accreqdet.ProcessQty;
                                    //objAccReqDet.ItemCode = (accreqdet.ItemCode == "" ? ItemCode : accreqdet.ItemCode);
                                    objAccReqDet.GarQty = accreqdet.Qty;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();


                                    var Pgc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, accreqdet.ItemId, (accreqdet.ReqColorId == 0 ? accreqdet.ColorId : accreqdet.ReqColorId), (objmas.AccSizeID == 0 ? accsizeid : objmas.AccSizeID), Buy_ordBomMasId);
                                    entities.SaveChanges();
                                }
                            }
                        }

                        //


                        //

                        //Update Prg_qty,BOM_qty in Buy_Ord_BOMMas End
                    }

                    if (objmas.ComboSizeList != null)
                    {
                        //Update TotalQty in Acc_Req_Det Begin
                        foreach (var accreqsizeinfo in objmas.ComboSizeList)
                        {
                            var App = entities.Acc_Req_Det.Where(c => c.AccReqDetID == accreqsizeinfo.AccReqDetId).FirstOrDefault();

                            //Get AccReqMasID from Acc_Req_Mas
                            if (AccReqMasId == 0 || AccReqMasId != App.AccReqMasID)
                            {
                                if (App != null)
                                {
                                    AccReqMasId = (int)App.AccReqMasID;
                                }
                            }

                            if (App != null)
                            {
                                App.TotalQty = accreqsizeinfo.ReqQty;
                                App.PQty = accreqsizeinfo.ProdQty;
                                App.QtyPerPiece = accreqsizeinfo.QUnit;
                                App.AccSizeID = accreqsizeinfo.AccSizeId;
                                App.AccColorID = objmas.AccColorID;
                            }
                            entities.SaveChanges();

                            if (objmas != null)
                            {
                                var AppMas = entities.Acc_Req_Mas.Where(c => c.AccReqMasID == AccReqMasId).FirstOrDefault();

                                if (AppMas != null)
                                {
                                    AppMas.Allowance = objmas.Allowance;
                                    AppMas.Prod_or_Ord = objmas.ProdOrOrd;
                                }
                                entities.SaveChanges();
                            }


                        }
                        //Update TotalQty in Acc_Req_Det End

                        //Update Prg_qty,BOM_qty in Buy_Ord_BOMMas Begin
                        var BuyOrdBomMasUpd = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                        if (BuyOrdBomMasUpd != null)
                        {
                            var BuyOrdBomDetUpd = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid).ToList();

                            if (BuyOrdBomDetUpd != null)
                            {
                                foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                {
                                    //Update Prg_qty,BOM_qty as 0

                                    foreach (var accreqmasinfo in objmas.ComboSizeList)
                                    {



                                        if (accreqdetinfo.Colorid == accreqmasinfo.AccColorId && accreqdetinfo.Sizeid == accreqmasinfo.OAccSizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = 0;
                                            accreqdetinfo.BOM_qty = 0;
                                        }
                                        entities.SaveChanges();
                                    }
                                }

                                foreach (var accreqmasinfo in objmas.ComboSizeList)
                                {
                                    foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                    {
                                        if (accreqdetinfo.Colorid == accreqmasinfo.AccColorId && accreqdetinfo.Sizeid == accreqmasinfo.OAccSizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = accreqdetinfo.Prg_qty + accreqmasinfo.ReqQty;

                                            if (accreqdetinfo.Conv_Mode == "D")
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.ReqQty / (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }
                                            else
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.ReqQty * (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }


                                          //  accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.ReqQty;
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }
                        //Update Prg_qty,BOM_qty in Buy_Ord_BOMMas End

                        //
                        foreach (var accreqmasinfo2 in objmas.ComboSizeList)
                        {
                            var BuyOrdBomMasUpd2 = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                            if (BuyOrdBomMasUpd2 != null)
                            {
                                if (accreqmasinfo2.ShipRowId == 0)
                                {
                                    var BuyOrdBomDetUpd2 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid).ToList();

                                    if (BuyOrdBomDetUpd2 != null)
                                    {
                                        foreach (var accreqdetinfo2 in BuyOrdBomDetUpd2)
                                        {
                                            if (accreqdetinfo2.Colorid == accreqmasinfo2.AccColorId && accreqdetinfo2.Sizeid == accreqmasinfo2.OAccSizeId && accreqdetinfo2.Itemid == accreqmasinfo2.ItemId)
                                            {
                                                accreqdetinfo2.Sizeid = accreqmasinfo2.AccSizeId;
                                                accreqdetinfo2.Colorid = objmas.AccColorID;
                                                entities.SaveChanges();
                                                //accreqdetinfo2.Sizeid = objmas.AccSizeID;
                                                //accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.ReqQty;
                                            }
                                            else if (accreqmasinfo2.AccReqDetId >0)
                                            {

                                                var BuyOrdBomDetUpd4 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid && c.Colorid == (objmas.AccColorID == 0 ? accreqmasinfo2.AccColorId : objmas.AccColorID) && c.Sizeid == (accreqmasinfo2.AccSizeId == 0 ? objmas.AccSizeID : accreqmasinfo2.AccSizeId) && c.Itemid == accreqmasinfo2.ItemId).FirstOrDefault();

                                                if (BuyOrdBomDetUpd4 == null)
                                                {
                                                    var Pgsc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, accreqmasinfo2.ItemId, (objmas.AccColorID == 0 ? accreqmasinfo2.AccColorId : objmas.AccColorID), (accreqmasinfo2.AccSizeId == 0 ? objmas.AccSizeID : accreqmasinfo2.AccSizeId), BuyOrdBomMasUpd2.Buy_Ord_BOMid);
                                                    entities.SaveChanges();

                                                }

                                            }
                                            entities.SaveChanges();
                                        }
                                    }
                                }
                                else
                                {
                                    var Pgsc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, accreqmasinfo2.ItemId, (objmas.AccColorID == 0 ? accreqmasinfo2.AccColorId : objmas.AccColorID), (accreqmasinfo2.AccSizeId == 0 ? objmas.AccSizeID : accreqmasinfo2.AccSizeId), BuyOrdBomMasUpd2.Buy_Ord_BOMid);
                                    entities.SaveChanges();
                                }
                            }
                        }



                        int Buy_ordBomMasId = 0;
                        //if (Mode == 0)
                        //{
                        var BuyordBomMas = entities.Buy_Ord_BOMMas.Where(d => d.Order_No == objmas.OrderNo && d.Styleid == objmas.StyleId && d.Access_Type == "A").FirstOrDefault();
                        if (BuyordBomMas == null)
                        {
                            //Adding Buy_Ord_BOMMas Begin
                            //accordbommas.Order_No = objmas.OrderNo;
                            //accordbommas.Styleid = objmas.StyleId;
                            //accordbommas.Access_Type = "A";
                            //accordbommas.Order_Qty = 0;
                            //accordbommas.ToJob = 0;
                            //accordbommas.ByJob = 0;
                            //accordbommas.Prog_thru = "A";
                            //accordbommas.Companyid = companyid;
                            //accordbommas.ToWork = 0;
                            //accordbommas.seqno = null;

                            //var buyordbommasid = entities.Buy_Ord_BOMMas.Add(accordbommas);
                            //entities.SaveChanges();

                            // Buy_ordBomMasId = buyordbommasid.Buy_Ord_BOMid;
                        }
                        else
                        {
                            Buy_ordBomMasId = BuyordBomMas.Buy_Ord_BOMid;
                        }

                        var objAccReqDet = new Acc_Req_Det();
                        //decimal? QtyUnit = null;
                        //int? PColorId = null;
                        //int? accsizeid = null;
                        int? acccolorid = null;

                        if (objmas.ComboSizeList != null && objmas.ComboSizeList.Count > 0)
                        {
                            foreach (var accreqdet in objmas.ComboSizeList)
                            {
                                if (accreqdet.AccReqDetId == 0)
                                {
                                    objAccReqDet.AccReqMasID = AccReqMasId;
                                    objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccColorID = (objmas.AccColorID == 0 ? acccolorid : objmas.AccColorID);
                                    objAccReqDet.AccSizeID = (accreqdet.AccSizeId == 0 ? 0 : accreqdet.AccSizeId);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QUnit == 0 ? 0 : accreqdet.QUnit);
                                    objAccReqDet.TotalQty = accreqdet.ReqQty;
                                    objAccReqDet.BOMQty = 0;// accreqdet.ReqQty;
                                    //objAccReqDet.PColorID = (accreqdet.p == 0 ? PColorId : accreqdet.PColorid);
                                    objAccReqDet.PQty = accreqdet.ProdQty;
                                    //objAccReqDet.ItemCode = (accreqdet.ItemCode == "" ? ItemCode : accreqdet.ItemCode);
                                    objAccReqDet.GarQty = accreqdet.Qty;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();


                                    var Pgc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, accreqdet.ItemId, (objmas.AccColorID == 0 ? acccolorid : objmas.AccColorID), (accreqdet.AccSizeId == 0 ? accreqdet.SizeId : accreqdet.AccSizeId), Buy_ordBomMasId);
                                    entities.SaveChanges();
                                }
                            }
                        }

                        //
                    }

                    if (objmas.ComboStyleList != null)
                    {


                        foreach (var accreqmasinfobom in objmas.ComboStyleList)
                        {

                            if (accreqmasinfobom.ShipRowId > 0)
                            {
                                var Pgc = entities.Proc_Apparel_GetPlanningTrimUpdateBomDet(accreqmasinfobom.AccReqDetId);
                                entities.SaveChanges();
                            }
                        }



                        //Update TotalQty in Acc_Req_Det Begin
                        foreach (var accreqstyleinfo in objmas.ComboStyleList)
                        {
                            var App = entities.Acc_Req_Det.Where(c => c.AccReqDetID == accreqstyleinfo.AccReqDetId).FirstOrDefault();

                            //Get AccReqMasID from Acc_Req_Mas
                            if (AccReqMasId == 0 || AccReqMasId != App.AccReqMasID)
                            {
                                if (App != null)
                                {
                                    AccReqMasId = (int)App.AccReqMasID;
                                }
                            }

                            if (App != null)
                            {
                                App.TotalQty = accreqstyleinfo.ReqQty;
                                App.PQty = accreqstyleinfo.ProcessQty;
                                App.AccColorID = accreqstyleinfo.PColorid;
                                App.QtyPerPiece = accreqstyleinfo.QUnit;
                                //App.AccColorID = (accreqstyleinfo.ColorId == 0 ? 0 : accreqstyleinfo.PColorid);
                                App.AccSizeID = accreqstyleinfo.AccSizeId;//(accreqstyleinfo.AccSizeId == 0 ? 0 : accreqstyleinfo.AccSizeId);



                                //
                            }
                            entities.SaveChanges();

                            if (objmas != null)
                            {
                                var AppMas = entities.Acc_Req_Mas.Where(c => c.AccReqMasID == AccReqMasId).FirstOrDefault();

                                if (AppMas != null)
                                {
                                    AppMas.Allowance = objmas.Allowance;
                                    AppMas.Prod_or_Ord = objmas.ProdOrOrd;
                                }
                                entities.SaveChanges();
                            }

                        }
                        //Update TotalQty in Acc_Req_Det End

                        //Update Prg_qty,BOM_qty in Buy_Ord_BOMMas Begin
                        var BuyOrdBomMasUpd = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                        if (BuyOrdBomMasUpd != null)
                        {
                            var BuyOrdBomDetUpd = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid).ToList();

                            if (BuyOrdBomDetUpd != null)
                            {
                                foreach (var accreqmasinfo in objmas.ComboStyleList)
                                {
                                    //Update Prg_qty,BOM_qty as 0
                                    foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                    {
                                        if (accreqdetinfo.Colorid == accreqmasinfo.OAccColorId && accreqdetinfo.Sizeid == accreqmasinfo.OAccSizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = 0;
                                            accreqdetinfo.BOM_qty = 0;
                                        }
                                        entities.SaveChanges();
                                    }
                                }

                                foreach (var accreqmasinfo in objmas.ComboStyleList)
                                {
                                    foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                    {
                                        if (accreqdetinfo.Colorid == accreqmasinfo.OAccColorId && accreqdetinfo.Sizeid == accreqmasinfo.OAccSizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = accreqdetinfo.Prg_qty + accreqmasinfo.ReqQty;

                                            if (accreqdetinfo.Conv_Mode == "D")
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.ReqQty / (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }
                                            else
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.ReqQty * (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }


                                            //accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.ReqQty;
                                        }


                                        entities.SaveChanges();
                                    }
                                }


                            }
                        }
                        //Update Prg_qty,BOM_qty in Buy_Ord_BOMMas End
                        //
                        foreach (var accreqmasinfo3 in objmas.ComboStyleList)
                        {
                            var BuyOrdBomMasUpd3 = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                            if (BuyOrdBomMasUpd3 != null)
                            {
                                var BuyOrdBomDetUpd3 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd3.Buy_Ord_BOMid).ToList();
                                if (accreqmasinfo3.ShipRowId == 0)
                                {
                                    if (BuyOrdBomDetUpd3 != null)
                                    {
                                        foreach (var accreqdetinfo3 in BuyOrdBomDetUpd3)
                                        {
                                            if (accreqdetinfo3.Colorid == accreqmasinfo3.OAccColorId && accreqdetinfo3.Sizeid == accreqmasinfo3.OAccSizeId && accreqdetinfo3.Itemid == accreqmasinfo3.ItemId)
                                            {
                                                accreqdetinfo3.Sizeid = accreqmasinfo3.AccSizeId;
                                                accreqdetinfo3.Colorid = accreqmasinfo3.PColorid;
                                                //accreqdetinfo2.Sizeid = objmas.AccSizeID;
                                                //accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.ReqQty;
                                            }
                                            else if (accreqmasinfo3.AccReqDetId >0)
                                            {

                                                var BuyOrdBomDetUpd4 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid && c.Colorid == accreqmasinfo3.PColorid && c.Sizeid == accreqmasinfo3.OAccSizeId && c.Itemid == accreqmasinfo3.ItemId).FirstOrDefault();

                                                if (BuyOrdBomDetUpd4 == null)
                                                {
                                                    var Pgsc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, accreqmasinfo3.ItemId, accreqmasinfo3.PColorid, accreqmasinfo3.OAccSizeId, BuyOrdBomMasUpd3.Buy_Ord_BOMid);
                                                    entities.SaveChanges();

                                                }
                                            }
                                            entities.SaveChanges();
                                        }
                                    }
                                }
                                else
                                {
                                    var Pgsc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, accreqmasinfo3.ItemId, accreqmasinfo3.PColorid, accreqmasinfo3.OAccSizeId, BuyOrdBomMasUpd3.Buy_Ord_BOMid);
                                    entities.SaveChanges();
                                }
                            }
                        }
                        //
                    }

                    if (objmas.GenAutoList != null)
                    {
                        //Delete and Insert into corressponding table
                        int id = 0;

                        //delete Buy_Ord_BOMMas Many Rows table
                        var BuyOrdBomMas = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                        if (BuyOrdBomMas != null)
                        {
                            if (objmas.GenAutoList != null && objmas.GenAutoList.Count > 0)
                            {
                                foreach (var accreqdet in objmas.GenAutoList)
                                {
                                    var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                    if (res != null)
                                    {
                                        id = (int)res.AccReqMasID;

                                        if (!intupdlist.Contains(id))
                                        {
                                            intupdlist.Add(id);
                                        }
                                    }

                                    //var deletebuyordbomcolor = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                                    //deletebuyordbomcolor.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                                    //entities.SaveChanges();
                                }
                            }
                        }


                        //Update Prg_qty,BOM_qty in Buy_Ord_BOMMas Begin
                        var BuyOrdBomMasUpd = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                        if (BuyOrdBomMasUpd != null)
                        {
                            var BuyOrdBomDetUpd = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid).ToList();

                            if (BuyOrdBomDetUpd != null)
                            {
                                foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                {
                                    //Update Prg_qty,BOM_qty as 0

                                    foreach (var accreqmasinfo in objmas.GenAutoList)
                                    {



                                        if (accreqdetinfo.Colorid == accreqmasinfo.ColorId && accreqdetinfo.Sizeid == accreqmasinfo.SizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = 0;
                                            accreqdetinfo.BOM_qty = 0;
                                        }
                                        entities.SaveChanges();
                                    }
                                }

                                foreach (var accreqmasinfo in objmas.GenAutoList)
                                {
                                    foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                    {
                                        if (accreqdetinfo.Colorid == accreqmasinfo.ColorId && accreqdetinfo.Sizeid == accreqmasinfo.SizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = accreqdetinfo.Prg_qty + accreqmasinfo.TotQty;

                                            if (accreqdetinfo.Conv_Mode == "D")
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.TotQty / (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }
                                            else
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.TotQty * (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }

                                           // accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.TotQty;
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }


                        foreach (var accreqmasinfo3 in objmas.GenAutoList)
                        {
                            var BuyOrdBomMasUpd3 = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                            if (BuyOrdBomMasUpd3 != null)
                            {
                                var BuyOrdBomDetUpd3 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd3.Buy_Ord_BOMid).ToList();

                                if (BuyOrdBomDetUpd3 != null)
                                {
                                    foreach (var accreqdetinfo3 in BuyOrdBomDetUpd3)
                                    {
                                        if (accreqdetinfo3.Colorid == accreqmasinfo3.ColorId && accreqdetinfo3.Sizeid == accreqmasinfo3.SizeId && accreqdetinfo3.Itemid == accreqmasinfo3.ItemId)
                                        {
                                            accreqdetinfo3.Sizeid = (accreqmasinfo3.ReqSizeId == 0 ? accreqmasinfo3.SizeId : accreqmasinfo3.ReqSizeId);//accreqmasinfo3.ReqSizeId;
                                            accreqdetinfo3.Colorid = (accreqmasinfo3.ReqColorId == 0 ? accreqmasinfo3.ColorId : accreqmasinfo3.ReqColorId);
                                            //accreqdetinfo2.Sizeid = objmas.AccSizeID;
                                            //accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.ReqQty;
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }


                        //delete Acc_Req_Mas Many Rows table
                        if (intupdlist != null && intupdlist.Count > 0)
                        {
                            foreach (var accreqmas in intupdlist)
                            {
                                var AccMas = entities.Acc_Req_Mas.Where(c => c.AccReqMasID == accreqmas).FirstOrDefault();
                                if (AccMas != null)
                                {
                                    //delete Acc_Req_Det Many Rows table
                                    var accreqdet = entities.Acc_Req_Det.Where(c => c.AccReqMasID == AccMas.AccReqMasID).ToList();
                                    if (accreqdet != null)
                                    {
                                        var deleteaccreqdet = entities.Acc_Req_Det.Where(d => d.AccReqMasID == AccMas.AccReqMasID).ToList<Acc_Req_Det>();
                                        deleteaccreqdet.ForEach(c => entities.Acc_Req_Det.Remove(c));
                                        entities.SaveChanges();

                                        //var tblcount=entities.Acc_Req_Mas.Count(q => q.AccReqMasID != null);

                                        entities.Acc_Req_Mas.Remove(AccMas);
                                        entities.SaveChanges();
                                    }

                                    var accreqstyleinfo = entities.Acc_Req_Style.Where(c => c.Order_No == objmas.OrderNo && c.StyleID == objmas.StyleId).FirstOrDefault();
                                    if (accreqstyleinfo != null)
                                    {
                                        var accreqmasinfo = entities.Acc_Req_Mas.Where(c => c.AccReqID == accreqstyleinfo.AccReqID).FirstOrDefault();

                                        if (accreqmasinfo == null)
                                        {
                                            entities.Acc_Req_Style.Remove(accreqstyleinfo);
                                            entities.SaveChanges();
                                        }
                                    }
                                }
                            }
                        }

                        //Insert Process Start
                        //Adding Acc_Req_Style Begin
                        var accreqstyle = new Acc_Req_Style();
                        var accordbommas = new Buy_Ord_BOMMas();
                        var accordbomdet = new Buy_Ord_BOMDet();
                        var PlanAdd = new Planning_Mas();
                        List<TrimsGenAuto> trimsgenautolst = new List<TrimsGenAuto>();
                        List<TrimsGenAuto> trimsgenmanuallst = new List<TrimsGenAuto>();

                        var Accreqid = 0;
                        var plantype = 0;
                        var companyid = 0;
                        var BuyerId = 0;
                        int accreMasId = 0;
                        int EBuyBomDetId = 0;

                        int BOrdMasid = 0;
                        var OQueryB1 = entities.Buy_Ord_Mas.Where(b => b.Buy_Ord_MasId == objmas.BuyOrdMasId).FirstOrDefault();
                        if (OQueryB1 != null)
                        {
                            //companyid = (int)OQueryB1.CompanyId;
                            BOrdMasid = (int)OQueryB1.Buy_Ord_MasId;
                        }

                        var Buyordsty = entities.Acc_Req_Style.Where(d => d.Order_No == objmas.OrderNo && d.StyleID == objmas.StyleId).FirstOrDefault();

                        if (Buyordsty == null)
                        {
                            accreqstyle.Order_No = objmas.OrderNo;
                            accreqstyle.BuyOrdMasId = BOrdMasid;
                            accreqstyle.StyleID = objmas.StyleId;
                            accreqstyle.StyleItemID = objmas.ItemId;
                            accreqstyle.EntryDate = objmas.EntryDate;//Convert.ToDateTime("2018-01-03");//EntryDate;
                            accreqstyle.BuyOrJob = "B";
                            accreqstyle.AccOrPack = "A";
                            accreqstyle.Amend = "N";

                            var buyordmasid = entities.Acc_Req_Style.Add(accreqstyle);
                            entities.SaveChanges();
                            Accreqid = buyordmasid.AccReqID;
                        }
                        else
                        {
                            Accreqid = Buyordsty.AccReqID;
                        }
                        //Adding Acc_Req_Style End

                        Acc_Req_Mas accreq = new Acc_Req_Mas();
                        string atoorman = (objmas.AutoOrMan == "1" ? "A" : objmas.AutoOrMan == "3" ? "S" : "M");
                        string divmul = (objmas.DivMul == "Multiply" ? "M" : "D");
                        plantype = (objmas.PlanType == "Color" ? 1 : objmas.PlanType == "Size" ? 2 : objmas.PlanType == "Style" ? 3 : 4);



                        int AItemId = 0;
                        foreach (var accreqmasupd in objmas.GenAutoList)
                        {
                            AItemId = accreqmasupd.ItemId;
                        }

                        if (atoorman == "S")
                        {



                            accreq.ShipRowID = objmas.ShopRowId;
                            accreq.AccReqID = Accreqid;
                            accreq.ItemID = AItemId;//objmas.ItemId;
                            accreq.Allowance = objmas.Allowance;
                            accreq.UnitId = objmas.Unitid;
                            //ItmId = objmas.ItemId;
                            accreq.Quantity = objmas.quantity;
                            accreq.PlanType = (objmas.PlanType == "Color" ? 1 : objmas.PlanType == "Size" ? 2 : objmas.PlanType == "Style" ? 3 : 4);
                            accreq.DivMul = divmul;
                            accreq.AutoOrMan = atoorman;
                            accreq.Prod_or_Ord = objmas.ProdOrOrd;
                            accreq.Item_Remarks = objmas.ItemRemarks;
                            accreq.Add_Date = objmas.AddDate;
                            accreq.LockRow = objmas.LockRow;
                            accreq.GenPlanType = objmas.GenPlanType;
                            accreq.Amend = objmas.Amend;
                            accreq.CreatedBy = objmas.CreatedBy;

                            //accreqmas.ShipRowID = accreqshipmas.shiprowid;
                            //accreqmas.AccReqID = Accreqid;
                            //ItmId = accreqmas.ItemID;
                            var accreqmid = entities.Acc_Req_Mas.Add(accreq);
                            entities.SaveChanges();
                            accreMasId = accreqmid.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();
                            decimal? QtyUnit = null;
                            //int? PColorId = null;
                            //int? accsizeid = null;
                            int? acccolorid = null;

                            if (objmas.GenAutoList != null && objmas.GenAutoList.Count > 0)
                            {
                                foreach (var accreqdet in objmas.GenAutoList)
                                {
                                    if (objmas.ShopRowId == accreqdet.ShipRowId)
                                    {
                                        objAccReqDet.AccReqMasID = accreMasId;
                                        //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                        objAccReqDet.AccSizeID = accreqdet.ReqSizeId; //(accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                        objAccReqDet.AccColorID = accreqdet.ReqColorId;//(accreqdet.ColorId == 0 ? acccolorid : accreqdet.ColorId);
                                        objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? QtyUnit : accreqdet.QtyPerPiece);
                                        objAccReqDet.GarQty = accreqdet.GarQty;
                                        objAccReqDet.TotalQty = accreqdet.TotQty;
                                        objAccReqDet.BOMQty = 0;

                                        entities.Acc_Req_Det.Add(objAccReqDet);
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }
                        else
                        {
                            accreq.ShipRowID = objmas.ShopRowId;
                            accreq.AccReqID = Accreqid;
                            accreq.ItemID = AItemId;//objmas.ItemId;
                            accreq.Allowance = objmas.Allowance;
                            accreq.UnitId = objmas.Unitid;
                            //ItmId = objmas.ItemId;
                            accreq.Quantity = objmas.quantity;
                            accreq.PlanType = (objmas.PlanType == "Color" ? 1 : objmas.PlanType == "Size" ? 2 : objmas.PlanType == "Style" ? 3 : 4);
                            accreq.DivMul = divmul;
                            accreq.AutoOrMan = atoorman;
                            accreq.Prod_or_Ord = objmas.ProdOrOrd;
                            accreq.Item_Remarks = objmas.ItemRemarks;
                            accreq.Add_Date = objmas.AddDate;
                            accreq.LockRow = objmas.LockRow;
                            accreq.GenPlanType = objmas.GenPlanType;
                            accreq.Amend = objmas.Amend;
                            accreq.CreatedBy = objmas.CreatedBy;
                            //accreqmas.AccReqID = Accreqid;
                            //ItmId = accreqmas.ItemID;
                            var accmasid = entities.Acc_Req_Mas.Add(accreq);
                            entities.SaveChanges();
                            accreMasId = accmasid.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();
                            decimal? QtyUnit = null;
                            int? PColorId = null;
                            int? accsizeid = null;
                            int? acccolorid = null;

                            if (objmas.GenAutoList != null && objmas.GenAutoList.Count > 0)
                            {
                                foreach (var accreqdet in objmas.GenAutoList)
                                {
                                    objAccReqDet.AccReqMasID = accreMasId;
                                    //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccSizeID = (accreqdet.ReqSizeId == 0 ? accreqdet.SizeId : accreqdet.ReqSizeId);
                                    objAccReqDet.AccColorID = (accreqdet.ReqColorId == 0 ? accreqdet.ColorId : accreqdet.ReqColorId);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? QtyUnit : accreqdet.QtyPerPiece);
                                    objAccReqDet.GarQty = accreqdet.GarQty;
                                    objAccReqDet.TotalQty = accreqdet.TotQty;
                                    objAccReqDet.BOMQty = 0;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();
                                }
                            }

                        }

                        int BuyOrdMasid = 0;
                        var OQueryB = entities.Buy_Ord_Mas.Where(b => b.Buy_Ord_MasId == objmas.BuyOrdMasId).FirstOrDefault();
                        if (OQueryB != null)
                        {
                            companyid = (int)OQueryB.CompanyId;
                            BuyOrdMasid = (int)OQueryB.Buy_Ord_MasId;
                            BuyerId = (int)OQueryB.BuyerId;
                        }

                        int Buy_ordBomMasId = 0;
                        //if (Mode == 0)
                        //{
                        var BuyordBomMas = entities.Buy_Ord_BOMMas.Where(d => d.Order_No == objmas.OrderNo && d.Styleid == objmas.StyleId && d.Access_Type == "A").FirstOrDefault();
                        if (BuyordBomMas == null)
                        {
                            //Adding Buy_Ord_BOMMas Begin
                            accordbommas.Order_No = objmas.OrderNo;
                            accordbommas.Styleid = objmas.StyleId;
                            accordbommas.Access_Type = "A";
                            accordbommas.Order_Qty = 0;
                            accordbommas.ToJob = 0;
                            accordbommas.ByJob = 0;
                            accordbommas.Prog_thru = "A";
                            accordbommas.Companyid = companyid;
                            accordbommas.ToWork = 0;
                            accordbommas.seqno = null;

                            var buyordbommasid = entities.Buy_Ord_BOMMas.Add(accordbommas);
                            entities.SaveChanges();

                            Buy_ordBomMasId = buyordbommasid.Buy_Ord_BOMid;
                        }
                        else
                        {
                            Buy_ordBomMasId = BuyordBomMas.Buy_Ord_BOMid;
                        }

                        //IList<TrimsDet> tsttrimdet;
                        //tsttrimdet = GetBuyOrdBomDet(Orderno, ItmId, Styleid, plantype);



                        foreach (var accreqmasinfo3 in objmas.GenAutoList)
                        {
                            var BuyOrdBomMasUpd3 = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                            if (BuyOrdBomMasUpd3 != null)
                            {
                                var BuyOrdBomDetUpd3 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd3.Buy_Ord_BOMid && c.Itemid == accreqmasinfo3.ItemId && c.Colorid == (accreqmasinfo3.ReqColorId == 0 ? accreqmasinfo3.ColorId : accreqmasinfo3.ReqColorId) && c.Sizeid == (accreqmasinfo3.ReqSizeId == 0 ? accreqmasinfo3.SizeId : accreqmasinfo3.ReqSizeId)).ToList();

                                if (BuyOrdBomDetUpd3.Count == 0)
                                {
                                    var Pgc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, AItemId, (accreqmasinfo3.ReqColorId == 0 ? accreqmasinfo3.ColorId : accreqmasinfo3.ReqColorId), (accreqmasinfo3.ReqSizeId == 0 ? accreqmasinfo3.SizeId : accreqmasinfo3.ReqSizeId), Buy_ordBomMasId);
                                    entities.SaveChanges();

                                }
                            }
                        }



                        //
                        //Check the Planning Entry Made
                        var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == objmas.OrderNo && b.StyleID == objmas.StyleId && b.CompanyID == companyid && b.ItemID == objmas.ItemId).FirstOrDefault();
                        if (OQueryP != null)
                        {
                            PlId = OQueryP.PlanID;

                            if (PlId > 0)
                            {
                                var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                                if (AppMas != null)
                                {
                                    AppMas.Acc_Plan = "E";
                                }
                                entities.SaveChanges();
                            }
                        }
                        else
                        {
                            if (PlId == 0)
                            {
                                PlanAdd.CompanyID = companyid;
                                PlanAdd.Buy_Ord_MasId = BuyOrdMasid;
                                PlanAdd.Order_No = objmas.OrderNo;
                                PlanAdd.StyleID = objmas.StyleId;
                                PlanAdd.ItemID = objmas.ItemId;
                                PlanAdd.Acc_Plan = "E";
                                PlanAdd.Pack_Plan = "N";
                                PlanAdd.Con_Plan = "N";
                                PlanAdd.Fabric_Plan = "N";
                                PlanAdd.Yarn_Plan = "N";
                                var idres = entities.Planning_Mas.Add(PlanAdd);
                                entities.SaveChanges();
                            }
                        }
                        //Insert Process End
                    }

                    if (objmas.GenManualList != null)
                    {
                        //Delete and Insert into corressponding table
                        int id = 0;

                        //delete Buy_Ord_BOMMas Many Rows table
                        var BuyOrdBomMas = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                        if (BuyOrdBomMas != null)
                        {
                            if (objmas.GenManualList != null && objmas.GenManualList.Count > 0)
                            {
                                foreach (var accreqdet in objmas.GenManualList)
                                {
                                    var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                    if (res != null)
                                    {
                                        id = (int)res.AccReqMasID;

                                        if (!intupdlist.Contains(id))
                                        {
                                            intupdlist.Add(id);
                                        }
                                    }

                                    //var deletebuyordbomcolor = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                                    //deletebuyordbomcolor.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                                    //entities.SaveChanges();
                                }
                            }
                        }


                        var BuyOrdBomMasUpd = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                        if (BuyOrdBomMasUpd != null)
                        {
                            var BuyOrdBomDetUpd = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid).ToList();

                            if (BuyOrdBomDetUpd != null)
                            {
                                foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                {
                                    //Update Prg_qty,BOM_qty as 0

                                    foreach (var accreqmasinfo in objmas.GenManualList)
                                    {



                                        if (accreqdetinfo.Colorid == accreqmasinfo.ColorId && accreqdetinfo.Sizeid == accreqmasinfo.SizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = 0;
                                            accreqdetinfo.BOM_qty = 0;
                                        }
                                        entities.SaveChanges();
                                    }
                                }

                                foreach (var accreqmasinfo in objmas.GenManualList)
                                {
                                    foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                    {
                                        if (accreqdetinfo.Colorid == accreqmasinfo.ColorId && accreqdetinfo.Sizeid == accreqmasinfo.SizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = accreqdetinfo.Prg_qty + accreqmasinfo.TotQty;
                                            if (accreqdetinfo.Conv_Mode == "D")
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.TotQty / (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }
                                            else
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.TotQty * (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }

                                            //accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.TotQty;
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }


                        foreach (var accreqmasinfo3 in objmas.GenManualList)
                        {
                            var BuyOrdBomMasUpd3 = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                            if (BuyOrdBomMasUpd3 != null)
                            {
                                var BuyOrdBomDetUpd3 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd3.Buy_Ord_BOMid).ToList();

                                if (BuyOrdBomDetUpd3 != null)
                                {
                                    foreach (var accreqdetinfo3 in BuyOrdBomDetUpd3)
                                    {
                                        if (accreqdetinfo3.Colorid == accreqmasinfo3.ColorId && accreqdetinfo3.Sizeid == accreqmasinfo3.SizeId && accreqdetinfo3.Itemid == accreqmasinfo3.ItemId)
                                        {
                                            accreqdetinfo3.Sizeid = (accreqmasinfo3.ReqSizeId == 0 ? accreqmasinfo3.SizeId : accreqmasinfo3.ReqSizeId);//accreqmasinfo3.ReqSizeId;
                                            accreqdetinfo3.Colorid = (accreqmasinfo3.ReqColorId == 0 ? accreqmasinfo3.ColorId : accreqmasinfo3.ReqColorId);
                                            //accreqdetinfo2.Sizeid = objmas.AccSizeID;
                                            //accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.ReqQty;
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }



                        //delete Acc_Req_Mas Many Rows table
                        if (intupdlist != null && intupdlist.Count > 0)
                        {
                            foreach (var accreqmas in intupdlist)
                            {
                                var AccMas = entities.Acc_Req_Mas.Where(c => c.AccReqMasID == accreqmas).FirstOrDefault();
                                if (AccMas != null)
                                {
                                    //delete Acc_Req_Det Many Rows table
                                    var accreqdet = entities.Acc_Req_Det.Where(c => c.AccReqMasID == AccMas.AccReqMasID).ToList();
                                    if (accreqdet != null)
                                    {
                                        var deleteaccreqdet = entities.Acc_Req_Det.Where(d => d.AccReqMasID == AccMas.AccReqMasID).ToList<Acc_Req_Det>();
                                        deleteaccreqdet.ForEach(c => entities.Acc_Req_Det.Remove(c));
                                        entities.SaveChanges();

                                        //var tblcount=entities.Acc_Req_Mas.Count(q => q.AccReqMasID != null);

                                        entities.Acc_Req_Mas.Remove(AccMas);
                                        entities.SaveChanges();
                                    }

                                    var accreqstyleinfo = entities.Acc_Req_Style.Where(c => c.Order_No == objmas.OrderNo && c.StyleID == objmas.StyleId).FirstOrDefault();
                                    if (accreqstyleinfo != null)
                                    {
                                        var accreqmasinfo = entities.Acc_Req_Mas.Where(c => c.AccReqID == accreqstyleinfo.AccReqID).FirstOrDefault();

                                        if (accreqmasinfo == null)
                                        {
                                            entities.Acc_Req_Style.Remove(accreqstyleinfo);
                                            entities.SaveChanges();
                                        }
                                    }
                                }
                            }
                        }

                        //Insert Process Start
                        //Adding Acc_Req_Style Begin
                        var accreqstyle = new Acc_Req_Style();
                        var accordbommas = new Buy_Ord_BOMMas();
                        var accordbomdet = new Buy_Ord_BOMDet();
                        var PlanAdd = new Planning_Mas();
                        List<TrimsGenAuto> trimsgenautolst = new List<TrimsGenAuto>();
                        List<TrimsGenAuto> trimsgenmanuallst = new List<TrimsGenAuto>();

                        var Accreqid = 0;
                        var plantype = 0;
                        var companyid = 0;
                        int accreMasId = 0;

                        var Buyordsty = entities.Acc_Req_Style.Where(d => d.Order_No == objmas.OrderNo && d.StyleID == objmas.StyleId).FirstOrDefault();

                        if (Buyordsty == null)
                        {
                            accreqstyle.Order_No = objmas.OrderNo;
                            accreqstyle.BuyOrdMasId = objmas.BuyOrdMasId;
                            accreqstyle.StyleID = objmas.StyleId;
                            accreqstyle.StyleItemID = objmas.ItemId;
                            accreqstyle.EntryDate = objmas.EntryDate;//EntryDate;
                            accreqstyle.BuyOrJob = "B";
                            accreqstyle.AccOrPack = "A";
                            accreqstyle.Amend = "N";

                            var buyordmasid = entities.Acc_Req_Style.Add(accreqstyle);
                            entities.SaveChanges();
                            Accreqid = buyordmasid.AccReqID;
                        }
                        else
                        {
                            Accreqid = Buyordsty.AccReqID;
                        }
                        //Adding Acc_Req_Style End

                        Acc_Req_Mas accreq = new Acc_Req_Mas();
                        string atoorman = (objmas.AutoOrMan == "1" ? "A" : objmas.AutoOrMan == "3" ? "S" : "M");
                        string divmul = (objmas.DivMul == "Multiply" ? "M" : "D");
                        plantype = (objmas.PlanType == "Color" ? 1 : objmas.PlanType == "Size" ? 2 : objmas.PlanType == "Style" ? 3 : 4);

                        int AItemId = 0;

                        if (atoorman == "M")
                        {
                            foreach (var accreqmasupd in objmas.GenManualList)
                            {
                                AItemId = accreqmasupd.ItemId;
                            }
                        }
                        else
                        {

                            foreach (var accreqmasupd in objmas.AccReqMas)
                            {
                                AItemId = accreqmasupd.ItemId;
                            }
                        }
                        if (atoorman == "S")
                        {
                            accreq.ShipRowID = objmas.ShopRowId;
                            accreq.AccReqID = Accreqid;
                            accreq.ItemID = AItemId;//objmas.ItemId;
                            accreq.Allowance = objmas.Allowance;
                            accreq.UnitId = objmas.Unitid;
                            //ItmId = objmas.ItemId;
                            accreq.Quantity = objmas.quantity;
                            accreq.PlanType = (objmas.PlanType == "Color" ? 1 : objmas.PlanType == "Size" ? 2 : objmas.PlanType == "Style" ? 3 : 4);
                            accreq.DivMul = divmul;
                            accreq.AutoOrMan = atoorman;
                            accreq.Prod_or_Ord = objmas.ProdOrOrd;
                            accreq.Item_Remarks = objmas.ItemRemarks;
                            accreq.Add_Date = objmas.AddDate;
                            accreq.LockRow = objmas.LockRow;
                            accreq.GenPlanType = objmas.GenPlanType;
                            accreq.Amend = objmas.Amend;
                            accreq.CreatedBy = objmas.CreatedBy;

                            //accreqmas.ShipRowID = accreqshipmas.shiprowid;
                            //accreqmas.AccReqID = Accreqid;
                            //ItmId = accreqmas.ItemID;
                            var accreqmid = entities.Acc_Req_Mas.Add(accreq);
                            entities.SaveChanges();
                            accreMasId = accreqmid.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();
                            decimal? QtyUnit = null;
                            //int? PColorId = null;
                            //int? accsizeid = null;
                            int? acccolorid = null;

                            if (objmas.GenManualList != null && objmas.GenManualList.Count > 0)
                            {
                                foreach (var accreqdet in objmas.GenManualList)
                                {
                                    if (objmas.ShopRowId == accreqdet.ShipRowId)
                                    {

                                        objAccReqDet.AccReqMasID = accreMasId;
                                        //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                        objAccReqDet.AccSizeID = accreqdet.ReqSizeId; //(accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                        objAccReqDet.AccColorID = accreqdet.ReqColorId;//(accreqdet.ColorId == 0 ? acccolorid : accreqdet.ColorId);
                                        objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? QtyUnit : accreqdet.QtyPerPiece);
                                        objAccReqDet.GarQty = accreqdet.GarQty;
                                        objAccReqDet.TotalQty = accreqdet.TotQty;
                                        objAccReqDet.BOMQty = 0;

                                        entities.Acc_Req_Det.Add(objAccReqDet);
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }
                        else
                        {
                            accreq.ShipRowID = objmas.ShopRowId;
                            accreq.AccReqID = Accreqid;
                            accreq.ItemID = AItemId;//objmas.ItemId;
                            accreq.Allowance = objmas.Allowance;
                            accreq.UnitId = objmas.Unitid;
                            //ItmId = objmas.ItemId;
                            accreq.Quantity = objmas.quantity;
                            accreq.PlanType = (objmas.PlanType == "Color" ? 1 : objmas.PlanType == "Size" ? 2 : objmas.PlanType == "Style" ? 3 : 4);
                            accreq.DivMul = divmul;
                            accreq.AutoOrMan = atoorman;
                            accreq.Prod_or_Ord = objmas.ProdOrOrd;
                            accreq.Item_Remarks = objmas.ItemRemarks;
                            accreq.Add_Date = objmas.AddDate;
                            accreq.LockRow = objmas.LockRow;
                            accreq.GenPlanType = objmas.GenPlanType;
                            accreq.Amend = objmas.Amend;
                            accreq.CreatedBy = objmas.CreatedBy;
                            //accreqmas.AccReqID = Accreqid;
                            //ItmId = accreqmas.ItemID;
                            var accmasid = entities.Acc_Req_Mas.Add(accreq);
                            entities.SaveChanges();
                            accreMasId = accmasid.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();
                            decimal? QtyUnit = null;
                            int? PColorId = null;
                            int? accsizeid = null;
                            int? acccolorid = null;

                            if (objmas.GenManualList != null && objmas.GenManualList.Count > 0)
                            {
                                foreach (var accreqdet in objmas.GenManualList)
                                {

                                    objAccReqDet.AccReqMasID = accreMasId;
                                    //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccSizeID = (accreqdet.ReqSizeId == 0 ? accreqdet.SizeId : accreqdet.ReqSizeId);
                                    objAccReqDet.AccColorID = (accreqdet.ReqColorId == 0 ? accreqdet.ColorId : accreqdet.ReqColorId);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? QtyUnit : accreqdet.QtyPerPiece);
                                    objAccReqDet.GarQty = accreqdet.GarQty;
                                    objAccReqDet.TotalQty = accreqdet.TotQty;
                                    objAccReqDet.BOMQty = 0;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();
                                }
                            }

                        }

                        int BuyOrdMasid = 0;
                        int BuyerId = 0;
                        var OQueryB = entities.Buy_Ord_Mas.Where(b => b.Buy_Ord_MasId == objmas.BuyOrdMasId).FirstOrDefault();
                        if (OQueryB != null)
                        {
                            companyid = (int)OQueryB.CompanyId;
                            BuyOrdMasid = (int)OQueryB.Buy_Ord_MasId;
                            BuyerId = (int)OQueryB.BuyerId;
                        }

                        int Buy_ordBomMasId = 0;
                        //if (Mode == 0)
                        //{
                        var BuyordBomMas = entities.Buy_Ord_BOMMas.Where(d => d.Order_No == objmas.OrderNo && d.Styleid == objmas.StyleId && d.Access_Type == "A").FirstOrDefault();
                        if (BuyordBomMas == null)
                        {
                            //Adding Buy_Ord_BOMMas Begin
                            accordbommas.Order_No = objmas.OrderNo;
                            accordbommas.Styleid = objmas.StyleId;
                            accordbommas.Access_Type = "A";
                            accordbommas.Order_Qty = 0;
                            accordbommas.ToJob = 0;
                            accordbommas.ByJob = 0;
                            accordbommas.Prog_thru = "A";
                            accordbommas.Companyid = companyid;
                            accordbommas.ToWork = 0;
                            accordbommas.seqno = null;

                            var buyordbommasid = entities.Buy_Ord_BOMMas.Add(accordbommas);
                            entities.SaveChanges();

                            Buy_ordBomMasId = buyordbommasid.Buy_Ord_BOMid;
                        }
                        else
                        {
                            Buy_ordBomMasId = BuyordBomMas.Buy_Ord_BOMid;
                        }

                        //IList<TrimsDet> tsttrimdet;
                        //tsttrimdet = GetBuyOrdBomDet(Orderno, ItmId, Styleid, plantype);
                        //var bomdet = GetBuyOrdBomDet(objmas.OrderNo, objmas.ItemId, objmas.StyleId, plantype, atoorman);

                        //if (bomdet.Count > 0)
                        //{
                        //    foreach (var bomdetinfo in bomdet)
                        //    {
                        //        int? PID = 0;
                        //        accordbomdet.Buy_Ord_BOMid = Buy_ordBomMasId;
                        //        accordbomdet.Itemid = bomdetinfo.itemid;
                        //        accordbomdet.Colorid = (bomdetinfo.acccolorid == 0 ? (int?)null : bomdetinfo.acccolorid);
                        //        accordbomdet.Sizeid = (bomdetinfo.accsizeid == 0 ? (int?)null : bomdetinfo.accsizeid);

                        //        var uomid = entities.Item.Where(d => d.ItemId == bomdetinfo.itemid).FirstOrDefault();
                        //        accordbomdet.UOMid = (int)uomid.Bas_Unit;
                        //        var imrate = entities.Item_Rate.Where(d => d.Itemid == bomdetinfo.itemid && d.ColorId == bomdetinfo.acccolorid && d.SizeId == bomdetinfo.accsizeid && d.Buyerid == BuyerId).FirstOrDefault();
                        //        if (imrate != null)
                        //        {


                        //            if (imrate.SupplierId == 0)
                        //            {
                        //                PID = null;
                        //            }
                        //            else
                        //            {
                        //                PID = imrate.SupplierId;
                        //            }

                        //            accordbomdet.SupplierId = PID;
                        //        }
                        //        accordbomdet.Prg_qty = bomdetinfo.TotalQty;
                        //        accordbomdet.Order_qty = 0;
                        //        accordbomdet.Received_qty = 0;
                        //        accordbomdet.Issue_qty = 0;
                        //        accordbomdet.Adjust_Qty = 0;
                        //        accordbomdet.BOM_qty = bomdetinfo.TotalQty;
                        //        accordbomdet.Pur_UOMid = uomid.Bas_Unit;
                        //        accordbomdet.ToPurUOM = 1;
                        //        accordbomdet.Conv_Mode = "M";
                        //        accordbomdet.PurForJob = "N";
                        //        accordbomdet.Debit_qty = 0;
                        //        accordbomdet.Transfer_In = 0;
                        //        accordbomdet.Transfer_Out = 0;
                        //        accordbomdet.Cancel_Qty = 0;
                        //        accordbomdet.CSP = "N";
                        //        accordbomdet.AltItem = "N";
                        //        accordbomdet.ItemClosure = "N";
                        //        accordbomdet.EntryDate = DateTime.Now;
                        //        accordbomdet.ItemRemarks = "";
                        //        accordbomdet.StockOut = 0;

                        //        entities.Buy_Ord_BOMDet.Add(accordbomdet);
                        //        entities.SaveChanges();
                        //    }
                        //}


                        foreach (var accreqmasinfo3 in objmas.GenManualList)
                        {
                            var BuyOrdBomMasUpd3 = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                            if (BuyOrdBomMasUpd3 != null)
                            {
                                var BuyOrdBomDetUpd3 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd3.Buy_Ord_BOMid && c.Itemid == accreqmasinfo3.ItemId && c.Colorid == (accreqmasinfo3.ReqColorId == 0 ? accreqmasinfo3.ColorId : accreqmasinfo3.ReqColorId) && c.Sizeid == (accreqmasinfo3.ReqSizeId == 0 ? accreqmasinfo3.SizeId : accreqmasinfo3.ReqSizeId)).ToList();

                                if (BuyOrdBomDetUpd3.Count == 0)
                                {
                                    var Pgc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, AItemId, (accreqmasinfo3.ReqColorId == 0 ? accreqmasinfo3.ColorId : accreqmasinfo3.ReqColorId), (accreqmasinfo3.ReqSizeId == 0 ? accreqmasinfo3.SizeId : accreqmasinfo3.ReqSizeId), Buy_ordBomMasId);
                                    entities.SaveChanges();

                                }
                            }
                        }

                        //Adding Buy_Ord_BOMMas End
                        //}

                        //
                        //Check the Planning Entry Made
                        var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == objmas.OrderNo && b.StyleID == objmas.StyleId && b.CompanyID == companyid && b.ItemID == objmas.ItemId).FirstOrDefault();
                        if (OQueryP != null)
                        {
                            PlId = OQueryP.PlanID;

                            if (PlId > 0)
                            {
                                var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                                if (AppMas != null)
                                {
                                    AppMas.Acc_Plan = "E";
                                }
                                entities.SaveChanges();
                            }
                        }
                        else
                        {
                            if (PlId == 0)
                            {
                                PlanAdd.CompanyID = companyid;
                                PlanAdd.Buy_Ord_MasId = BuyOrdMasid;
                                PlanAdd.Order_No = objmas.OrderNo;
                                PlanAdd.StyleID = objmas.StyleId;
                                PlanAdd.ItemID = objmas.ItemId;
                                PlanAdd.Acc_Plan = "E";
                                PlanAdd.Pack_Plan = "N";
                                PlanAdd.Con_Plan = "N";
                                PlanAdd.Fabric_Plan = "N";
                                PlanAdd.Yarn_Plan = "N";
                                var idres = entities.Planning_Mas.Add(PlanAdd);
                                entities.SaveChanges();
                            }
                        }
                        //Insert Process End
                    }
                    //Cost table insert --NOT FOR KPR 
                    //var result3 = entities.Proc_Apparel_InsertPlanCostTrims(objmas.OrderNo, objmas.StyleId);
                    //entities.SaveChanges();
                    //
                    //if (objmas.GenManualList != null)
                    //{
                    //    int id = 0;
                    //    //Delete and Insert into corressponding table

                    //    //delete Buy_Ord_BOMMas Many Rows table
                    //    var BuyOrdBomMas = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                    //    if (BuyOrdBomMas != null)
                    //    {
                    //        if (objmas.GenManualList != null && objmas.GenManualList.Count > 0)
                    //        {
                    //            foreach (var accreqdet in objmas.GenManualList)
                    //            {
                    //                var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                    //                if (res != null)
                    //                {
                    //                    id = (int)res.AccReqMasID;

                    //                    if (!intupdlist.Contains(id))
                    //                    {
                    //                        intupdlist.Add(id);
                    //                    }
                    //                }

                    //                var deletebuyordbomcolor = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                    //                deletebuyordbomcolor.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                    //                entities.SaveChanges();
                    //            }
                    //        }
                    //    }

                    //    //delete Acc_Req_Mas Many Rows table
                    //    if (intupdlist != null && intupdlist.Count > 0)
                    //    {
                    //        foreach (var accreqmas in intupdlist)
                    //        {
                    //            var AccMas = entities.Acc_Req_Mas.Where(c => c.AccReqMasID == accreqmas).FirstOrDefault();
                    //            if (AccMas != null)
                    //            {
                    //                //delete Acc_Req_Det Many Rows table
                    //                var accreqdet = entities.Acc_Req_Det.Where(c => c.AccReqMasID == AccMas.AccReqMasID).ToList();
                    //                if (accreqdet != null)
                    //                {
                    //                    var deleteaccreqdet = entities.Acc_Req_Det.Where(d => d.AccReqMasID == AccMas.AccReqMasID).ToList<Acc_Req_Det>();
                    //                    deleteaccreqdet.ForEach(c => entities.Acc_Req_Det.Remove(c));
                    //                    entities.SaveChanges();

                    //                    //var tblcount=entities.Acc_Req_Mas.Count(q => q.AccReqMasID != null);

                    //                    entities.Acc_Req_Mas.Remove(AccMas);
                    //                    entities.SaveChanges();
                    //                }

                    //                var accreqstyleinfo = entities.Acc_Req_Style.Where(c => c.Order_No == objmas.OrderNo && c.StyleID == objmas.StyleId).FirstOrDefault();
                    //                if (accreqstyleinfo != null)
                    //                {
                    //                    var accreqmasinfo = entities.Acc_Req_Mas.Where(c => c.AccReqID == accreqstyleinfo.AccReqID).FirstOrDefault();

                    //                    if (accreqmasinfo == null)
                    //                    {
                    //                        entities.Acc_Req_Style.Remove(accreqstyleinfo);
                    //                        entities.SaveChanges();
                    //                    }
                    //                }
                    //            }
                    //        }
                    //    }
                    //}


                    if (objmas.GenShipmentList != null)
                    {
                        //Delete and Insert into corressponding table
                        int id = 0;

                        //delete Buy_Ord_BOMMas Many Rows table
                        var BuyOrdBomMas = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                        if (BuyOrdBomMas != null)
                        {
                            if (objmas.GenShipmentList != null && objmas.GenShipmentList.Count > 0)
                            {
                                foreach (var accreqdet in objmas.GenShipmentList)
                                {
                                    var res = entities.Acc_Req_Det.Where(e => e.AccReqDetID == accreqdet.AccReqDetId).FirstOrDefault();
                                    if (res != null)
                                    {
                                        id = (int)res.AccReqMasID;

                                        if (!intupdlist.Contains(id))
                                        {
                                            intupdlist.Add(id);
                                        }
                                    }

                                    //var deletebuyordbomcolor = entities.Buy_Ord_BOMDet.Where(d => d.Buy_Ord_BOMid == BuyOrdBomMas.Buy_Ord_BOMid && d.Colorid == accreqdet.ColorId && d.Sizeid == accreqdet.SizeId && d.Itemid == accreqdet.ItemId).ToList<Buy_Ord_BOMDet>();
                                    //deletebuyordbomcolor.ForEach(c => entities.Buy_Ord_BOMDet.Remove(c));
                                    //entities.SaveChanges();
                                }
                            }
                        }


                        //Update Prg_qty,BOM_qty in Buy_Ord_BOMMas Begin
                        var BuyOrdBomMasUpd = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                        if (BuyOrdBomMasUpd != null)
                        {
                            var BuyOrdBomDetUpd = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd.Buy_Ord_BOMid).ToList();

                            if (BuyOrdBomDetUpd != null)
                            {
                                foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                {
                                    //Update Prg_qty,BOM_qty as 0

                                    foreach (var accreqmasinfo in objmas.GenShipmentList)
                                    {



                                        if (accreqdetinfo.Colorid == accreqmasinfo.ColorId && accreqdetinfo.Sizeid == accreqmasinfo.SizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = 0;
                                            accreqdetinfo.BOM_qty = 0;
                                        }
                                        entities.SaveChanges();
                                    }
                                }

                                foreach (var accreqmasinfo in objmas.GenShipmentList)
                                {
                                    foreach (var accreqdetinfo in BuyOrdBomDetUpd)
                                    {
                                        if (accreqdetinfo.Colorid == accreqmasinfo.ColorId && accreqdetinfo.Sizeid == accreqmasinfo.SizeId && accreqdetinfo.Itemid == accreqmasinfo.ItemId)
                                        {
                                            accreqdetinfo.Prg_qty = accreqdetinfo.Prg_qty + accreqmasinfo.TotQty;
                                            if (accreqdetinfo.Conv_Mode == "D")
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.TotQty / (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }
                                            else
                                            {
                                                decimal reqqty = ((decimal)accreqmasinfo.TotQty * (decimal)accreqdetinfo.ToPurUOM);
                                                accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + reqqty;
                                            }

                                           // accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.TotQty;
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }


                        foreach (var accreqmasinfo3 in objmas.GenShipmentList)
                        {
                            var BuyOrdBomMasUpd3 = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                            if (BuyOrdBomMasUpd3 != null)
                            {
                                var BuyOrdBomDetUpd3 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd3.Buy_Ord_BOMid).ToList();

                                if (BuyOrdBomDetUpd3 != null)
                                {
                                    foreach (var accreqdetinfo3 in BuyOrdBomDetUpd3)
                                    {
                                        if (accreqdetinfo3.Colorid == accreqmasinfo3.ColorId && accreqdetinfo3.Sizeid == accreqmasinfo3.SizeId && accreqdetinfo3.Itemid == accreqmasinfo3.ItemId)
                                        {
                                            accreqdetinfo3.Sizeid = (accreqmasinfo3.ReqSizeId == 0 ? accreqmasinfo3.SizeId : accreqmasinfo3.ReqSizeId);//accreqmasinfo3.ReqSizeId;
                                            accreqdetinfo3.Colorid = (accreqmasinfo3.ReqColorId == 0 ? accreqmasinfo3.ColorId : accreqmasinfo3.ReqColorId);
                                            //accreqdetinfo2.Sizeid = objmas.AccSizeID;
                                            //accreqdetinfo.BOM_qty = accreqdetinfo.BOM_qty + accreqmasinfo.ReqQty;
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }


                        //delete Acc_Req_Mas Many Rows table
                        if (intupdlist != null && intupdlist.Count > 0)
                        {
                            foreach (var accreqmas in intupdlist)
                            {
                                var AccMas = entities.Acc_Req_Mas.Where(c => c.AccReqMasID == accreqmas).FirstOrDefault();
                                if (AccMas != null)
                                {
                                    //delete Acc_Req_Det Many Rows table
                                    var accreqdet = entities.Acc_Req_Det.Where(c => c.AccReqMasID == AccMas.AccReqMasID).ToList();
                                    if (accreqdet != null)
                                    {
                                        var deleteaccreqdet = entities.Acc_Req_Det.Where(d => d.AccReqMasID == AccMas.AccReqMasID).ToList<Acc_Req_Det>();
                                        deleteaccreqdet.ForEach(c => entities.Acc_Req_Det.Remove(c));
                                        entities.SaveChanges();

                                        //var tblcount=entities.Acc_Req_Mas.Count(q => q.AccReqMasID != null);

                                        entities.Acc_Req_Mas.Remove(AccMas);
                                        entities.SaveChanges();
                                    }

                                    var accreqstyleinfo = entities.Acc_Req_Style.Where(c => c.Order_No == objmas.OrderNo && c.StyleID == objmas.StyleId).FirstOrDefault();
                                    if (accreqstyleinfo != null)
                                    {
                                        var accreqmasinfo = entities.Acc_Req_Mas.Where(c => c.AccReqID == accreqstyleinfo.AccReqID).FirstOrDefault();

                                        if (accreqmasinfo == null)
                                        {
                                            entities.Acc_Req_Style.Remove(accreqstyleinfo);
                                            entities.SaveChanges();
                                        }
                                    }
                                }
                            }
                        }

                        //Insert Process Start
                        //Adding Acc_Req_Style Begin
                        var accreqstyle = new Acc_Req_Style();
                        var accordbommas = new Buy_Ord_BOMMas();
                        var accordbomdet = new Buy_Ord_BOMDet();
                        var PlanAdd = new Planning_Mas();
                        List<TrimsGenAuto> trimsgenautolst = new List<TrimsGenAuto>();
                        List<TrimsGenAuto> trimsgenmanuallst = new List<TrimsGenAuto>();

                        var Accreqid = 0;
                        var plantype = 0;
                        var companyid = 0;
                        var BuyerId = 0;
                        int accreMasId = 0;
                        int EBuyBomDetId = 0;

                        int BOrdMasid = 0;
                        var OQueryB1 = entities.Buy_Ord_Mas.Where(b => b.Buy_Ord_MasId == objmas.BuyOrdMasId).FirstOrDefault();
                        if (OQueryB1 != null)
                        {
                            //companyid = (int)OQueryB1.CompanyId;
                            BOrdMasid = (int)OQueryB1.Buy_Ord_MasId;
                        }

                        var Buyordsty = entities.Acc_Req_Style.Where(d => d.Order_No == objmas.OrderNo && d.StyleID == objmas.StyleId).FirstOrDefault();

                        if (Buyordsty == null)
                        {
                            accreqstyle.Order_No = objmas.OrderNo;
                            accreqstyle.BuyOrdMasId = BOrdMasid;
                            accreqstyle.StyleID = objmas.StyleId;
                            accreqstyle.StyleItemID = objmas.ItemId;
                            accreqstyle.EntryDate = objmas.EntryDate;//Convert.ToDateTime("2018-01-03");//EntryDate;
                            accreqstyle.BuyOrJob = "B";
                            accreqstyle.AccOrPack = "A";
                            accreqstyle.Amend = "N";

                            var buyordmasid = entities.Acc_Req_Style.Add(accreqstyle);
                            entities.SaveChanges();
                            Accreqid = buyordmasid.AccReqID;
                        }
                        else
                        {
                            Accreqid = Buyordsty.AccReqID;
                        }
                        //Adding Acc_Req_Style End

                        Acc_Req_Mas accreq = new Acc_Req_Mas();
                        string atoorman = (objmas.AutoOrMan == "1" ? "A" : objmas.AutoOrMan == "3" ? "S" : "M");
                        string divmul = (objmas.DivMul == "Multiply" ? "M" : "D");
                        plantype = (objmas.PlanType == "Color" ? 1 : objmas.PlanType == "Size" ? 2 : objmas.PlanType == "Style" ? 3 : 4);



                        int AItemId = 0;
                        foreach (var accreqmasupd in objmas.GenShipmentList)
                        {
                            AItemId = accreqmasupd.ItemId;
                        }

                        if (atoorman == "S")
                        {
                            //foreach (var accreqmasupd in objmas.GenShipmentList)
                            //{
                            //    AItemId = accreqmasupd.ItemId;
                            //}


                            ////accreq.ShipRowID = objmas.ShopRowId;
                            ////accreq.AccReqID = Accreqid;
                            ////accreq.ItemID = AItemId;//objmas.ItemId;
                            ////accreq.Allowance = objmas.Allowance;
                            ////accreq.UnitId = objmas.Unitid;
                            //////ItmId = objmas.ItemId;
                            ////accreq.Quantity = objmas.quantity;
                            ////accreq.PlanType = (objmas.PlanType == "Color" ? 1 : objmas.PlanType == "Size" ? 2 : objmas.PlanType == "Style" ? 3 : 4);
                            ////accreq.DivMul = divmul;
                            ////accreq.AutoOrMan = atoorman;
                            ////accreq.Prod_or_Ord = objmas.ProdOrOrd;
                            ////accreq.Item_Remarks = objmas.ItemRemarks;
                            ////accreq.Add_Date = objmas.AddDate;
                            ////accreq.LockRow = objmas.LockRow;
                            ////accreq.GenPlanType = objmas.GenPlanType;
                            ////accreq.Amend = objmas.Amend;
                            ////accreq.CreatedBy = objmas.CreatedBy;

                            //////accreqmas.ShipRowID = accreqshipmas.shiprowid;
                            //////accreqmas.AccReqID = Accreqid;
                            //////ItmId = accreqmas.ItemID;
                            ////var accreqmid = entities.Acc_Req_Mas.Add(accreq);
                            ////entities.SaveChanges();
                            ////accreMasId = accreqmid.AccReqMasID;

                            ////var objAccReqDet = new Acc_Req_Det();
                            ////decimal? QtyUnit = null;
                            //////int? PColorId = null;
                            //////int? accsizeid = null;
                            ////int? acccolorid = null;

                            ////if (objmas.GenShipmentList != null && objmas.GenShipmentList.Count > 0)
                            ////{
                            ////    foreach (var accreqdet in objmas.GenShipmentList)
                            ////    {
                            ////        if (objmas.ShopRowId == accreqdet.ShipRowId)
                            ////        {
                            ////            objAccReqDet.AccReqMasID = accreMasId;
                            ////            //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                            ////            objAccReqDet.AccSizeID = accreqdet.ReqSizeId; //(accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                            ////            objAccReqDet.AccColorID = accreqdet.ReqColorId;//(accreqdet.ColorId == 0 ? acccolorid : accreqdet.ColorId);
                            ////            objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? QtyUnit : accreqdet.QtyPerPiece);
                            ////            objAccReqDet.GarQty = accreqdet.GarQty;
                            ////            objAccReqDet.TotalQty = accreqdet.TotQty;
                            ////            objAccReqDet.BOMQty = 0;

                            ////            entities.Acc_Req_Det.Add(objAccReqDet);
                            ////            entities.SaveChanges();
                            ////        }
                            ////    }
                            ////}

                            //decimal totqtybyrec = 0;
                            //foreach (var accreqshipmas in objmas.ComboShipList)
                            //{

                            //    if (objmas.GenShipmentList != null && objmas.GenShipmentList.Count > 0)
                            //    {
                            //        foreach (var accreqdet in objmas.GenShipmentList)
                            //        {
                            //            if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                            //            {
                            //                totqtybyrec = totqtybyrec + accreqdet.TotQty;
                            //            }
                            //        }
                            //    }

                            //    Acc_Req_Mas accreq1 = new Acc_Req_Mas();

                            //    accreq.ShipRowID = accreqshipmas.shiprowid;
                            //    accreq.AccReqID = Accreqid;
                            //    accreq.ItemID = AItemId;
                            //    accreq.Allowance = objmas.Allowance;
                            //    accreq.UnitId = objmas.Unitid;                               
                            //    //accreq.Quantity = (accreqmasobj.GenShipmentList.Count>0?totqtybyrec: accreqmas.Quantity);
                            //    accreq.Quantity = objmas.quantity;
                            //    accreq.PlanType = 4;
                            //    accreq.DivMul = objmas.DivMul;
                            //    accreq.AutoOrMan = objmas.AutoOrMan;
                            //    accreq.Prod_or_Ord = objmas.ProdOrOrd;
                            //    accreq.Item_Remarks = "TEST";
                            //    accreq.Add_Date = objmas.AddDate;
                            //    accreq.LockRow = objmas.LockRow;
                            //    accreq.GenPlanType = objmas.GenPlanType;
                            //    accreq.Amend = objmas.Amend;
                            //    accreq.CreatedBy = objmas.CreatedBy;

                            //    //accreqmas.ShipRowID = accreqshipmas.shiprowid;
                            //    //accreqmas.AccReqID = Accreqid;
                            //    //ItmId = accreqmas.ItemID;
                            //    var id1 = entities.Acc_Req_Mas.Add(accreq);
                            //    entities.SaveChanges();
                            //    accreMasId = id1.AccReqMasID;

                            //    var objAccReqDet = new Acc_Req_Det();
                            //    decimal? QtyUnit = null;
                            //    int? PColorId = null;
                            //    int? accsizeid = null;
                            //    int? acccolorid = null;




                            //    if (objmas.GenShipmentList != null && objmas.GenShipmentList.Count > 0 )
                            //    {
                            //        foreach (var accreqdet in objmas.GenShipmentList)
                            //        {
                            //            if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                            //            {
                            //                objAccReqDet.AccReqMasID = accreMasId;
                            //                //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                            //                objAccReqDet.AccSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                            //                objAccReqDet.AccColorID = (accreqdet.ColorId == 0 ? acccolorid : accreqdet.ColorId);
                            //                objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? 0 : accreqdet.QtyPerPiece);
                            //                objAccReqDet.GarQty = accreqdet.GarQty;
                            //                objAccReqDet.TotalQty = accreqdet.TotQty;
                            //                objAccReqDet.BOMQty = 0;

                            //                entities.Acc_Req_Det.Add(objAccReqDet);
                            //                entities.SaveChanges();
                            //            }
                            //        }
                            //    }
                            //    totqtybyrec = 0;
                            //}


                            decimal totqtybyrec = 0;

                            if (atoorman == "S")
                            {
                                applytype = atoorman;

                                foreach (var accreqshipmas in objmas.ComboShipList)
                                {

                                    if (objmas.GenShipmentList != null && objmas.GenShipmentList.Count > 0)
                                    {
                                        foreach (var accreqdet in objmas.GenShipmentList)
                                        {
                                            if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                                            {
                                                totqtybyrec = totqtybyrec + accreqdet.TotQty;
                                            }
                                        }
                                    }

                                    Acc_Req_Mas accreq1 = new Acc_Req_Mas();

                                    accreq1.ShipRowID = accreqshipmas.shiprowid;
                                    accreq1.AccReqID = Accreqid;
                                    accreq1.ItemID = AItemId;
                                    accreq1.Allowance = objmas.Allowance;
                                    accreq1.UnitId = objmas.Unitid;
                                    ItmId = accreq1.ItemID;
                                    //accreq.Quantity = (accreqmasobj.GenShipmentList.Count>0?totqtybyrec: accreqmas.Quantity);
                                    accreq1.Quantity = objmas.quantity;
                                    accreq1.PlanType = 4;
                                    accreq1.DivMul = objmas.DivMul;
                                    accreq1.AutoOrMan = objmas.AutoOrMan;
                                    accreq1.Prod_or_Ord = objmas.ProdOrOrd;
                                    accreq1.Item_Remarks = objmas.ItemRemarks;
                                    accreq1.Add_Date = objmas.AddDate;
                                    accreq1.LockRow = objmas.LockRow;
                                    accreq1.GenPlanType = objmas.GenPlanType;
                                    accreq1.Amend = objmas.Amend;
                                    accreq1.CreatedBy = objmas.CreatedBy;

                                    //accreqmas.ShipRowID = accreqshipmas.shiprowid;
                                    //accreqmas.AccReqID = Accreqid;
                                    //ItmId = accreqmas.ItemID;
                                    //var id1 = entities.Acc_Req_Mas.Add(accreq);

                                    var Pgc = entities.Proc_Apparel_InsertShipAccReqMas(Accreqid, AItemId, objmas.Unitid, objmas.Allowance, objmas.quantity, divmul, atoorman, objmas.ProdOrOrd, objmas.AddDate, accreqshipmas.shiprowid, objmas.GenPlanType, objmas.CreatedBy);
                                    entities.SaveChanges();


                                    var OQueryBs1 = entities.Acc_Req_Mas.Where(b => b.AccReqID == Accreqid && b.ItemID == AItemId && b.PlanType == 4 && b.AutoOrMan == atoorman && b.ShipRowID == accreqshipmas.shiprowid).FirstOrDefault();
                                    if (OQueryBs1 != null)
                                    {
                                        //companyid = (int)OQueryB1.CompanyId;
                                        accreMasId = (int)OQueryBs1.AccReqMasID;
                                    }
                                    entities.SaveChanges();


                                    var objAccReqDet = new Acc_Req_Det();
                                    decimal? QtyUnit = null;
                                    int? PColorId = null;
                                    int? accsizeid = null;
                                    int? acccolorid = null;




                                    if (objmas.GenShipmentList != null && objmas.GenShipmentList.Count > 0)
                                    {
                                        foreach (var accreqdet in objmas.GenShipmentList)
                                        {
                                            if (accreqshipmas.shiprowid == accreqdet.ShipRowId)
                                            {
                                                objAccReqDet.AccReqMasID = accreMasId;
                                                //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                                objAccReqDet.AccSizeID = (accreqdet.ReqSizeId == 0 ? accreqdet.SizeId : accreqdet.ReqSizeId);
                                                objAccReqDet.AccColorID = (accreqdet.ReqColorId == 0 ? accreqdet.ColorId : accreqdet.ReqColorId);
                                                objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? QtyUnit : accreqdet.QtyPerPiece);
                                                objAccReqDet.GarQty = accreqdet.GarQty;
                                                objAccReqDet.TotalQty = accreqdet.TotQty;
                                                objAccReqDet.BOMQty = 0;

                                                entities.Acc_Req_Det.Add(objAccReqDet);
                                                entities.SaveChanges();
                                            }
                                        }
                                    }
                                    totqtybyrec = 0;
                                }
                            }


                        }
                        else
                        {
                            accreq.ShipRowID = objmas.ShopRowId;
                            accreq.AccReqID = Accreqid;
                            accreq.ItemID = AItemId;//objmas.ItemId;
                            accreq.Allowance = objmas.Allowance;
                            accreq.UnitId = objmas.Unitid;
                            //ItmId = objmas.ItemId;
                            accreq.Quantity = objmas.quantity;
                            accreq.PlanType = (objmas.PlanType == "Color" ? 1 : objmas.PlanType == "Size" ? 2 : objmas.PlanType == "Style" ? 3 : 4);
                            accreq.DivMul = divmul;
                            accreq.AutoOrMan = atoorman;
                            accreq.Prod_or_Ord = objmas.ProdOrOrd;
                            accreq.Item_Remarks = objmas.ItemRemarks;
                            accreq.Add_Date = objmas.AddDate;
                            accreq.LockRow = objmas.LockRow;
                            accreq.GenPlanType = objmas.GenPlanType;
                            accreq.Amend = objmas.Amend;
                            accreq.CreatedBy = objmas.CreatedBy;
                            //accreqmas.AccReqID = Accreqid;
                            //ItmId = accreqmas.ItemID;
                            var accmasid = entities.Acc_Req_Mas.Add(accreq);
                            entities.SaveChanges();
                            accreMasId = accmasid.AccReqMasID;

                            var objAccReqDet = new Acc_Req_Det();
                            decimal? QtyUnit = null;
                            int? PColorId = null;
                            int? accsizeid = null;
                            int? acccolorid = null;

                            if (objmas.GenShipmentList != null && objmas.GenShipmentList.Count > 0)
                            {
                                foreach (var accreqdet in objmas.GenShipmentList)
                                {
                                    objAccReqDet.AccReqMasID = accreMasId;
                                    //objAccReqDet.GarSizeID = (accreqdet.SizeId == 0 ? 0 : accreqdet.SizeId);
                                    objAccReqDet.AccSizeID = (accreqdet.ReqSizeId == 0 ? accreqdet.SizeId : accreqdet.ReqSizeId);
                                    objAccReqDet.AccColorID = (accreqdet.ReqColorId == 0 ? accreqdet.ColorId : accreqdet.ReqColorId);
                                    objAccReqDet.QtyPerPiece = (accreqdet.QtyPerPiece == 0 ? QtyUnit : accreqdet.QtyPerPiece);
                                    objAccReqDet.GarQty = accreqdet.GarQty;
                                    objAccReqDet.TotalQty = accreqdet.TotQty;
                                    objAccReqDet.BOMQty = 0;

                                    entities.Acc_Req_Det.Add(objAccReqDet);
                                    entities.SaveChanges();
                                }
                            }

                        }

                        int BuyOrdMasid = 0;
                        var OQueryB = entities.Buy_Ord_Mas.Where(b => b.Buy_Ord_MasId == objmas.BuyOrdMasId).FirstOrDefault();
                        if (OQueryB != null)
                        {
                            companyid = (int)OQueryB.CompanyId;
                            BuyOrdMasid = (int)OQueryB.Buy_Ord_MasId;
                            BuyerId = (int)OQueryB.BuyerId;
                        }

                        int Buy_ordBomMasId = 0;
                        //if (Mode == 0)
                        //{
                        var BuyordBomMas = entities.Buy_Ord_BOMMas.Where(d => d.Order_No == objmas.OrderNo && d.Styleid == objmas.StyleId && d.Access_Type == "A").FirstOrDefault();
                        if (BuyordBomMas == null)
                        {
                            //Adding Buy_Ord_BOMMas Begin
                            accordbommas.Order_No = objmas.OrderNo;
                            accordbommas.Styleid = objmas.StyleId;
                            accordbommas.Access_Type = "A";
                            accordbommas.Order_Qty = 0;
                            accordbommas.ToJob = 0;
                            accordbommas.ByJob = 0;
                            accordbommas.Prog_thru = "A";
                            accordbommas.Companyid = companyid;
                            accordbommas.ToWork = 0;
                            accordbommas.seqno = null;

                            var buyordbommasid = entities.Buy_Ord_BOMMas.Add(accordbommas);
                            entities.SaveChanges();

                            Buy_ordBomMasId = buyordbommasid.Buy_Ord_BOMid;
                        }
                        else
                        {
                            Buy_ordBomMasId = BuyordBomMas.Buy_Ord_BOMid;
                        }

                        //IList<TrimsDet> tsttrimdet;
                        //tsttrimdet = GetBuyOrdBomDet(Orderno, ItmId, Styleid, plantype);



                        foreach (var accreqmasinfo3 in objmas.GenShipmentList)
                        {
                            var BuyOrdBomMasUpd3 = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == objmas.OrderNo && c.Styleid == objmas.StyleId && c.Access_Type == "A").FirstOrDefault();
                            if (BuyOrdBomMasUpd3 != null)
                            {
                                var BuyOrdBomDetUpd3 = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == BuyOrdBomMasUpd3.Buy_Ord_BOMid && c.Itemid == accreqmasinfo3.ItemId && c.Colorid == (accreqmasinfo3.ReqColorId == 0 ? accreqmasinfo3.ColorId : accreqmasinfo3.ReqColorId) && c.Sizeid == (accreqmasinfo3.ReqSizeId == 0 ? accreqmasinfo3.SizeId : accreqmasinfo3.ReqSizeId)).ToList();

                                if (BuyOrdBomDetUpd3.Count == 0)
                                {
                                    var Pgc = entities.Proc_Apparel_InsertTrimBomUpdate(objmas.OrderNo, objmas.StyleId, AItemId, (accreqmasinfo3.ReqColorId == 0 ? accreqmasinfo3.ColorId : accreqmasinfo3.ReqColorId), (accreqmasinfo3.ReqSizeId == 0 ? accreqmasinfo3.SizeId : accreqmasinfo3.ReqSizeId), Buy_ordBomMasId);
                                    entities.SaveChanges();

                                }
                            }
                        }



                        //
                        //Check the Planning Entry Made
                        var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == objmas.OrderNo && b.StyleID == objmas.StyleId && b.CompanyID == companyid && b.ItemID == objmas.ItemId).FirstOrDefault();
                        if (OQueryP != null)
                        {
                            PlId = OQueryP.PlanID;

                            if (PlId > 0)
                            {
                                var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                                if (AppMas != null)
                                {
                                    AppMas.Acc_Plan = "E";
                                }
                                entities.SaveChanges();
                            }
                        }
                        else
                        {
                            if (PlId == 0)
                            {
                                PlanAdd.CompanyID = companyid;
                                PlanAdd.Buy_Ord_MasId = BuyOrdMasid;
                                PlanAdd.Order_No = objmas.OrderNo;
                                PlanAdd.StyleID = objmas.StyleId;
                                PlanAdd.ItemID = objmas.ItemId;
                                PlanAdd.Acc_Plan = "E";
                                PlanAdd.Pack_Plan = "N";
                                PlanAdd.Con_Plan = "N";
                                PlanAdd.Fabric_Plan = "N";
                                PlanAdd.Yarn_Plan = "N";
                                var idres = entities.Planning_Mas.Add(PlanAdd);
                                entities.SaveChanges();
                            }
                        }
                        //Insert Process End
                    }

                    var Pg5 = entities.Proc_Apparel_GetPlanTrimDeleteBomUpdate(objmas.OrderNo, objmas.StyleId);
                    entities.SaveChanges();



                    //insert for Prg summ table
                    var result3 = entities.Proc_Apparel_GetPlanInsertAccPrgSumDetails(objmas.OrderNo, objmas.StyleId);
                    entities.SaveChanges();
                    //

                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Trims-UpdateData");
                    return false;
                    throw ex;
                }
            }
        }

        public bool BOMApprovalChecking(string orderno, int styleid, int itemid, int PlanTypeId, string ApplyType)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //Checking Validation of BudgetApproval Begin
                    bool bomflg = false;

                    //var CostDefnMas = entities.Cost_Defn_Mas.Where(c => c.Order_No == orderno && c.styleid == styleid).FirstOrDefault();

                    var CostDefnMas = entities.Proc_Apparel_CheckBudgetApproval(orderno, styleid, itemid, PlanTypeId, ApplyType).FirstOrDefault();

                    if (CostDefnMas == null)
                    {
                        bomflg = false;
                    }
                    else
                    {
                        //var CostDefnBOM = entities.Cost_Defn_BOM.Where(c => c.Cost_Defn_id == CostDefnMas.Cost_Defn_id && c.AppRate > 0).ToList();
                        //if (CostDefnBOM != null)
                        //{

                        bomflg = true;
                        //}
                    }
                    return bomflg;
                    //Checking Validation of BudgetApproval End
                }
                catch (Exception ex)
                {
                    return false;
                    throw ex;
                }
            }
        }

        public IQueryable<AccessoryReqMas> GetDataBussCheckItemDetails(string orderno, int StyleId, int Itemid, int CAItemId, int ApplyID, string AutoOrMan)
        {
            IQueryable<AccessoryReqMas> query = (from a in entities.Proc_Apparel_PlanningChkItemDuplicate(CAItemId, ApplyID, AutoOrMan, orderno, StyleId, Itemid)
                                                 select new AccessoryReqMas
                                           {

                                               ChkCountAccReqNo = (int)a.ChkAccReqNo,
                                               OrderNo = a.OrdNo,


                                           }).AsQueryable();

            return query;
        }

        public bool Loadordtemp(string OrderNo, int StyleId, int Itemid, int Userid,int Stytempid)
        {
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var chk = entities.Proc_Apparel_GetTrimsCheckforTemplateAdd(OrderNo, StyleId, Stytempid ,Itemid).FirstOrDefault();
                    if (chk == 0)
                    {
                        var StyleTemp = entities.Proc_Apparel_InsertStyleTemTrims(Userid, OrderNo, StyleId, Itemid, Stytempid);
                    }

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Trims-AddData");
                    return false;
                    throw ex;
                }

            }
        }


        //public IQueryable<AccessoryReqMas> GetDataRepCheckPlanTrimTempDetails(string orderno, int StyleId, int Itemid, int CAItemId)
        //{
        //    IQueryable<AccessoryReqMas> query = (from a in entities.Proc_Apparel_proc_EditChkOrderTempGetAccOrPack_Planning(orderno, StyleId, Itemid, CAItemId)
        //                                         select new AccessoryReqMas
        //                                         {

        //                                             ChkCountOrderTemp = (int)a.ChkTempItem,
        //                                             AccReqMasID = (int)a.AccReqMasID,


        //                                         }).AsQueryable();

        //    return query;
        //}


        public IQueryable<AccessoryReqMas> GetDataRepCheckPlanTrimTempDetails(string orderno, int StyleId, int Itemid, int CAItemId)
        {
            throw new NotImplementedException();
        }
    }
}
