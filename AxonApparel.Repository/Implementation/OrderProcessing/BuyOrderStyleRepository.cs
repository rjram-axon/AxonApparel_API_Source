using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using System.Transactions;
namespace AxonApparel.Repository
{
    public class BuyOrderStyleRepository : IBuyOrderStyleRepository
    {
        OrderEntities entities = new OrderEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<buy_ord_style> GetDataList()
        {
            return entities.buy_ord_style.OrderBy(c => c.order_no);

        }

        public Buy_Ord_Mas GetOrderRefNo(int Orderid)
        {
            return entities.Buy_Ord_Mas.Where(d => d.Buy_Ord_MasId == Orderid).FirstOrDefault();
        }

        public IQueryable<OrderItem> GetItemByStyle(int Styleid)
        {
            var query = (from a in entities.Proc_Apparel_GetItemByStyle(Styleid)
                         select new OrderItem
                         {
                             ItemId = a.ItemId,
                             Item1 = a.Item
                         }).AsQueryable();

            return query;
        }

        public IQueryable<MarkEnqMas> GetEnquiryNo()
        {
            return entities.MarkEnqMas.OrderBy(e => e.EnquiryId);
        }

        //public Buy_Ord_Ship GetOrderQuantity(string OrderNo)
        //{
        //    return entities.Buy_Ord_Ship.Where(d => d.Order_No == OrderNo).FirstOrDefault();
        //}

        public buy_ord_style GetDataById(int id, string styletype = "")
        {
            var buyordsty = entities.buy_ord_style.Where(c => c.StyleRowid == id).FirstOrDefault();

            var ComboItemlst = new List<ComboItem>();

            if (buyordsty.ComboItem.Count > 0)
            {
                foreach (var item in buyordsty.ComboItem)
                {
                    ComboItemlst.Add(new ComboItem
                    {
                        ComboitemRowId=item.ComboitemRowId,
                        ComboColorId =(int) (styletype=="N"?item.ComboColorId:entities.ComboColor.Where(d=>d.CombocolorId==item.ComboColorId).Select(e=>e.ColorSeq).FirstOrDefault()),
                        StyleRowId = item.StyleRowId,
                        Itemseq =(int) item.Itemseq,
                        ItemID =(int) item.ItemID,
                        Item=item.Item,
                        ItemRatio =(int) item.ItemRatio,
                        Flag = item.Flag,                        
                    });
                }

                buyordsty.ComboItem = ComboItemlst;
            }


            return buyordsty;
            //return entities.buy_ord_style.Where(c => c.StyleRowid == id).FirstOrDefault();
        }

        public bool GetShipmentChecking(int id)
        {
            var buyship = entities.Buy_Ord_Ship.Where(c => c.StyleRowid == id).FirstOrDefault();

            if (buyship != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //public Domain.BuyOrderStyle GetDataById(int id)
        //{
        //    var getdata = (from bt in entities.buy_ord_style
        //                   join bm in entities.Buy_Ord_Mas1 on bt.order_no equals bm.Order_No
        //                   where bt.StyleRowid==id
        //                   select new 
        //                   { 
        //                    bt.order_no,
        //                    bt.Styleid,
        //                    bm.Ref_No,
        //                    bm.Quantity,
        //                    bt.StyleRowid,
        //                    bt.styleentdate,
        //                    bt.SeasonId,
        //                    bt.quantity,
        //                    bt.price,
        //                    bt.value,
        //                   }).FirstOrDefault();

        //    Domain.BuyOrderStyle varbs = new Domain.BuyOrderStyle();

        //    if (getdata != null)
        //    {
        //        varbs.StyleRowid = getdata.StyleRowid;
        //        varbs.order_no = getdata.order_no;
        //        varbs.Styleid = getdata.Styleid;
        //        varbs.Ref_No = getdata.Ref_No;
        //        varbs.quantity = (decimal)getdata.quantity;
        //        varbs.OrderQuantity = (decimal)getdata.Quantity;
        //        varbs.styleentdate =(DateTime) getdata.styleentdate;
        //        varbs.SeasonId = (int)getdata.SeasonId;
        //        varbs.price = (int)getdata.price;
        //        varbs.value = (int)getdata.value;
        //    }

        //    return varbs;
        //}

        public bool AddData(buy_ord_style objAdd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    Repository.buy_ord_style buyordsty = new Repository.buy_ord_style();
                    if (objAdd != null)
                    {
                        buyordsty.order_no = objAdd.order_no;
                        buyordsty.Enquiryid = objAdd.Enquiryid;
                        buyordsty.Styleid = objAdd.Styleid;
                        buyordsty.quantity = objAdd.quantity;
                        buyordsty.price = (decimal)objAdd.price;
                        buyordsty.value = (decimal)objAdd.value;
                        buyordsty.ProductionQty = (decimal)objAdd.quantity;
                        buyordsty.SeasonId = objAdd.SeasonId;
                        buyordsty.styleentdate = objAdd.styleentdate;
                        buyordsty.job_qty = 0;
                        buyordsty.cost_estimated = true;
                        buyordsty.cutG_Amend = "N";
                        buyordsty.Grouped_StyleID = 0;
                        buyordsty.Grouped = true;
                        buyordsty.OpenPrgAmend = "N";
                        buyordsty.mis_tmArchive = 0;
                        buyordsty.mis_type = 0;
                        buyordsty.Despatch_Closed = "N";
                        buyordsty.CurrencyId = objAdd.CurrencyId;
                        buyordsty.Exchange = objAdd.Exchange;
                        buyordsty.CAD_Weight = objAdd.CAD_Weight;
                        buyordsty.CAD_Percentage = objAdd.CAD_Percentage;
                        buyordsty.PA = objAdd.PA;
                        buyordsty.Description = objAdd.Description;
                    }

                    var id = entities.buy_ord_style.Add(buyordsty);
                    entities.SaveChanges();


                    //Update OrderMas Currency

                    var App = entities.Buy_Ord_Mas.Where(c => c.Order_No == objAdd.order_no).FirstOrDefault();
                    if (App != null)
                    {
                        App.CurrencyId = objAdd.CurrencyId;
                        App.Exchange = objAdd.Exchange;

                    }
                    entities.SaveChanges();
                    //ComboSize Start
                    var ComboSizeList = new List<Repository.Combosize>();

                    foreach (var combosize in objAdd.Combosize)
                    {
                        ComboSizeList.Add(new Repository.Combosize
                        {
                            StyleRowId = id.StyleRowid,
                            SizeId = combosize.SizeId,
                            Sizerow = combosize.Sizerow,
                            ComboSizeSeq = combosize.ComboSizeSeq
                        });
                    }

                    var Sizeresult = AddSizeDetData(ComboSizeList, "Add");

                    ////ComboSize End

                    //ComboColor Start
                    var ComboColorList = new List<Repository.ComboColor>();

                    foreach (var combocolor in objAdd.ComboColor)
                    {
                        ComboColorList.Add(new Repository.ComboColor
                        {
                            StyleRowId = id.StyleRowid,
                            Comboid = combocolor.Comboid,
                            Colorid = combocolor.Colorid,
                            ColorRatio = combocolor.ColorRatio,
                            ComboPer = combocolor.ComboPer,
                            ComboQty = combocolor.ComboQty,
                            ComboSeq = combocolor.ComboSeq,
                            ColorSeq = combocolor.ColorSeq,
                            Itemid = combocolor.Itemid,
                        });
                    }

                    var Colorresult = AddColorDetData(ComboColorList, "Add");
                    //ComboColor End

                    //ComboItem Start
                    var ComboColorItemList = new List<Repository.ComboItem>();

                    foreach (var comboitem in objAdd.ComboItem)
                    {
                        ComboColorItemList.Add(new Repository.ComboItem
                        {
                            StyleRowId = id.StyleRowid,
                            ComboColorId = comboitem.ComboColorId,
                            Itemseq = comboitem.Itemseq,
                            ItemID = comboitem.ItemID,
                            ItemRatio = comboitem.ItemRatio,
                        });
                    }

                    var ColorItemresult = AddItemDetData(ComboColorItemList, "Add");
                    //ComboItem End

                    //ComboItem_Composition Start
                    var ComboColorItemCompositionList = new List<Repository.Comboitem_Composition>();
                    if (objAdd.Comboitem_Composition.Count > 0)
                    {
                        foreach (var itemcomp in objAdd.Comboitem_Composition)
                        {
                            ComboColorItemCompositionList.Add(new Repository.Comboitem_Composition
                            {
                                StyleRowId = id.StyleRowid,
                                ComboitemRowId = itemcomp.ComboitemRowId,
                                ColorSeq = itemcomp.ColorSeq,
                                ColorId = itemcomp.ColorId,
                            });
                        }
                    }
                    var ColorItemYarnresult = AddItemCompsitionDetData(ComboColorItemCompositionList, "Add");
                    //ComboItem_Composition End

                    //Image
                    var Imgdet = new List<Repository.Buy_Ord_Img>();
                    if (objAdd.Buy_Ord_Img.Count > 0)
                    {
                        foreach (var img in objAdd.Buy_Ord_Img)
                        {
                            Imgdet.Add(new Repository.Buy_Ord_Img
                            {
                                Imgpath = img.Imgpath,
                                Imgtitle = img.Imgtitle,
                                Order_no = img.Order_no,
                                StyleRowid = id.StyleRowid
                            });
                        }
                    }

                    foreach (var item in Imgdet)
                    {

                        var addl = entities.Buy_Ord_Img.Add(item);
                    }
                    entities.SaveChanges();

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;

                    //return id.StyleRowid;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BuyOrdStyle-AddData");
                    return false;
                    throw ex;
                }
            }
        }

        public bool AddColorDetData(List<ComboColor> objCDet, string Mode)
        {
            try
            {
                int StylerowId = 0;

                if (Mode == "Update")
                {
                    foreach (var item in objCDet)
                    {
                        if (StylerowId == 0)
                        {
                            StylerowId = (int)item.StyleRowId;
                        }
                    }
                    //Update many rows ComboColor 
                    var UpdateComboColor = entities.ComboColor.Where(x => x.StyleRowId == StylerowId).ToList();
                    UpdateComboColor.ForEach(a => a.Flag = "D");

                    ////delete ComboColor Many Rows table
                    //var deletestyledet = entities.ComboColors.Where(d => d.StyleRowId == StylerowId).ToList<ComboColor>();

                    //deletestyledet.ForEach(c => entities.ComboColors.Remove(c));
                    entities.SaveChanges();
                }

                foreach (var item in objCDet)
                {
                    item.Flag = "I";
                    entities.ComboColor.Add(item);
                }
                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddItemDetData(List<ComboItem> objCDet, string Mode)
        {
            try
            {
                int StylerowId = 0;
                int ComboColorRowId = 0;

                if (Mode == "Update")
                {
                    foreach (var item in objCDet)
                    {
                        if (StylerowId == 0)
                        {
                            StylerowId = (int)item.StyleRowId;
                        }
                    }
                    //Update many rows ComboColor 
                    var UpdateComboItem = entities.ComboItem.Where(x => x.StyleRowId == StylerowId).ToList();
                    UpdateComboItem.ForEach(a => a.Flag = "D");

                    ////delete ComboItem Many Rows table
                    //var deletestyledet = entities.ComboItems.Where(d => d.StyleRowId == StylerowId).ToList<ComboItem>();

                    //deletestyledet.ForEach(c => entities.ComboItems.Remove(c));
                    entities.SaveChanges();
                }

                foreach (var item in objCDet)
                {
                    if (Mode == "Update")
                    {
                        var addl = entities.ComboColor.Where(c => c.StyleRowId == item.StyleRowId && c.CombocolorId == item.ComboColorId).FirstOrDefault();

                        if (addl != null)
                        {
                            addl = entities.ComboColor.Where(c => c.StyleRowId == item.StyleRowId && c.ColorSeq == addl.ColorSeq && c.CombocolorId != item.ComboColorId && c.Flag == "I").FirstOrDefault();

                            if (addl != null)
                            {
                                ComboColorRowId = addl.CombocolorId;
                            }
                        }
                        else
                        {
                            var addli = entities.ComboColor.Where(c => c.StyleRowId == item.StyleRowId && c.ColorSeq == item.ComboColorId && c.Flag == "I").FirstOrDefault();

                            if (addli != null)
                            {
                                ComboColorRowId = addli.CombocolorId;
                            }
                        }
                    }
                    else
                    {
                        var addl = entities.ComboColor.Where(c => c.StyleRowId == item.StyleRowId && c.ColorSeq == item.ComboColorId && c.Flag == "I").FirstOrDefault();

                        if (addl != null)
                        {
                            ComboColorRowId = addl.CombocolorId;
                        }
                    }

                    item.Flag = "I";
                    item.ComboColorId = ComboColorRowId;
                    entities.ComboItem.Add(item);

                }
                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddItemCompsitionDetData(List<Comboitem_Composition> objCDet, string Mode)
        {
            try
            {
                int StylerowId = 0;
                int ComboItemRowId = 0;

                if (Mode == "Update")
                {
                    foreach (var item in objCDet)
                    {
                        if (StylerowId == 0)
                        {
                            StylerowId = (int)item.StyleRowId;
                        }
                    }
                    //Update many rows ComboColor 
                    var UpdateComboItemComp = entities.Comboitem_Composition.Where(x => x.StyleRowId == StylerowId).ToList();
                    UpdateComboItemComp.ForEach(a => a.Flag = "D");

                    ////delete ComboItem_Composition Many Rows table
                    //var deletestyledet = entities.Comboitem_Composition.Where(d => d.StyleRowId == StylerowId).ToList<Comboitem_Composition>();

                    //deletestyledet.ForEach(c => entities.Comboitem_Composition.Remove(c));
                    entities.SaveChanges();
                }

                foreach (var item in objCDet)
                {
                    if (Mode == "Update")
                    {
                        var addl = entities.ComboItem.Where(c => c.StyleRowId == item.StyleRowId && c.ComboitemRowId == item.ComboitemRowId).FirstOrDefault();

                        if (addl != null)
                        {
                            addl = entities.ComboItem.Where(c => c.StyleRowId == item.StyleRowId && c.Itemseq == addl.Itemseq && c.ComboitemRowId != item.ComboitemRowId && c.Flag == "I").FirstOrDefault();

                            if (addl != null)
                            {
                                ComboItemRowId = addl.ComboitemRowId;
                            }
                        }
                        else
                        {
                            var addlis = entities.ComboItem.Where(c => c.StyleRowId == item.StyleRowId && c.Itemseq == item.ComboitemRowId && c.Flag == "I").FirstOrDefault();

                            if (addlis != null)
                            {
                                ComboItemRowId = addlis.ComboitemRowId;
                            }
                        }
                    }
                    else
                    {
                        var addl = entities.ComboItem.Where(c => c.StyleRowId == item.StyleRowId && c.Itemseq == item.ComboitemRowId && c.Flag == "I").FirstOrDefault();

                        if (addl != null)
                        {
                            ComboItemRowId = addl.ComboitemRowId;
                        }
                    }


                    //var addl = entities.ComboColors.Where(c => c.StyleRowId == item.StyleRowId).FirstOrDefault();

                    //if (addl != null)
                    //{
                    //    ComboItemRowId = addl.ComboitemRowId;
                    //}
                    item.Flag = "I";
                    item.ComboitemRowId = ComboItemRowId;

                    entities.Comboitem_Composition.Add(item);
                }
                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddSizeDetData(List<Combosize> objCDet, string Mode)
        {
            try
            {
                int StylerowId = 0;

                if (Mode == "Update")
                {
                    foreach (var item in objCDet)
                    {
                        StylerowId = (int)item.StyleRowId;
                    }
                    //delete ComboSize Many Rows table
                    var deletestyledet = entities.Combosize.Where(d => d.StyleRowId == StylerowId).ToList<Combosize>();

                    deletestyledet.ForEach(c => entities.Combosize.Remove(c));
                    entities.SaveChanges();
                }

                foreach (var item in objCDet)
                {
                    entities.Combosize.Add(item);
                }
                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateData(buy_ord_style objUpd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //var result = false;
                    Repository.buy_ord_style buyordsty = new Repository.buy_ord_style();

                    var App = entities.buy_ord_style.Where(c => c.StyleRowid == objUpd.StyleRowid).FirstOrDefault();
                    if (App != null)
                    {
                        //if (objUpd != null)
                        //{
                        App.order_no = objUpd.order_no;
                        App.Styleid = objUpd.Styleid;
                        App.categoryid = objUpd.categoryid;
                        App.quantity = objUpd.quantity;
                        App.price = objUpd.price;
                        App.value = objUpd.value;
                        App.job_qty = objUpd.job_qty;
                        App.LongDesc = objUpd.LongDesc;
                        App.cost_estimated = objUpd.cost_estimated;
                        App.styleentdate = objUpd.styleentdate;
                        //App.AllowancePer = objUpd.AllowancePer;
                        App.ProductionQty = objUpd.ProductionQty;
                        //App.packplan_thru = objUpd.packplan_thru;
                        App.Amend = objUpd.Amend;
                        App.Yarn_Amend = objUpd.Yarn_Amend;
                        App.Acc_Amend = objUpd.Acc_Amend;
                        App.Pack_Amend = objUpd.Pack_Amend;
                        App.Despatch_Closed = objUpd.Despatch_Closed;
                        App.despatch_qty = objUpd.despatch_qty;
                        //App.Unit_Type = objUpd.Unit_Type;
                        App.cutG_Amend = objUpd.cutG_Amend;
                        App.Grouped_StyleID = objUpd.Grouped_StyleID;
                        App.Grouped = objUpd.Grouped;
                        //App.WORKORDER = objUpd.WORKORDER;
                        //App.Company_Unitid = objUpd.Company_Unitid;
                        //App.TransferredTo = objUpd.TransferredTo;
                        //App.Transfer = objUpd.Transfer;
                        //App.Base_Unit = objUpd.Base_Unit;
                        App.Enquiryid = objUpd.Enquiryid;
                        App.BuyerArt = objUpd.BuyerArt;
                        //App.buyerItem = objUpd.buyerItem;
                        App.OpenPrgAmend = objUpd.OpenPrgAmend;
                        App.SampleStyleId = objUpd.SampleStyleId;
                        //App.shipentdate = objUpd.shipentdate;
                        App.SeasonId = objUpd.SeasonId;
                        App.GarmentGsm = objUpd.GarmentGsm;
                        App.ProcessUnitID = objUpd.ProcessUnitID;
                        App.CreatedBy = objUpd.CreatedBy;
                        App.mis_tmArchive = objUpd.mis_tmArchive;
                        App.mis_type = objUpd.mis_type;
                        App.Cancel = objUpd.Cancel;
                        App.CurrencyId = objUpd.CurrencyId;
                        App.Exchange = objUpd.Exchange;
                        App.CAD_Weight = objUpd.CAD_Weight;
                        App.CAD_Percentage = objUpd.CAD_Percentage;
                        App.PA = objUpd.PA;
                        App.Description = objUpd.Description;
                    }
                    entities.SaveChanges();

                    //Update OrderMas Currency

                    var AppU = entities.Buy_Ord_Mas.Where(c => c.Order_No == objUpd.order_no).FirstOrDefault();
                    if (AppU != null)
                    {
                        AppU.CurrencyId = objUpd.CurrencyId;
                        AppU.Exchange = objUpd.Exchange;

                    }
                    entities.SaveChanges();

                    //ComboSize Begin
                    var ComboSizeList = new List<Repository.Combosize>();

                    if (objUpd.Combosize.Count > 0)
                    {
                        foreach (var item in objUpd.Combosize)
                        {
                            ComboSizeList.Add(new Repository.Combosize
                            {
                                StyleRowId = objUpd.StyleRowid,
                                ComboSizeSeq = item.ComboSizeSeq,
                                SizeId = item.SizeId,
                                Sizerow = item.Sizerow,
                            });
                        }
                    }

                    var result = AddSizeDetData(ComboSizeList, "Update");
                    //ComboSize End

                    //ComboColor Begin
                    var CombocolorList = new List<Repository.ComboColor>();

                    if (objUpd.ComboColor.Count > 0)
                    {
                        foreach (var item in objUpd.ComboColor)
                        {
                            CombocolorList.Add(new Repository.ComboColor
                            {
                                CombocolorId = item.CombocolorId,
                                StyleRowId = objUpd.StyleRowid,
                                Comboid = item.Comboid,
                                Colorid = item.Colorid,
                                ColorRatio = item.ColorRatio,
                                ComboPer = item.ComboPer,
                                ComboQty = item.ComboQty,
                                ComboSeq = item.ComboSeq,
                                ColorSeq = item.ColorSeq,
                                Itemid = item.Itemid,
                            });
                        }
                    }

                    var Combocolorresult = AddColorDetData(CombocolorList, "Update");
                    //ComboColor End

                    //ComboItem Start
                    var ComboColorItemList = new List<Repository.ComboItem>();

                    foreach (var comboitem in objUpd.ComboItem)
                    {
                        ComboColorItemList.Add(new Repository.ComboItem
                        {
                            StyleRowId = objUpd.StyleRowid,
                            ComboColorId = comboitem.ComboColorId,
                            Itemseq = comboitem.Itemseq,
                            ItemID = comboitem.ItemID,
                            ItemRatio = comboitem.ItemRatio,
                        });
                    }

                    var ColorItemresult = AddItemDetData(ComboColorItemList, "Update");
                    //ComboItem End

                    //ComboItem_Composition Start
                    var ComboColorItemCompositionList = new List<Repository.Comboitem_Composition>();
                    if (objUpd.Comboitem_Composition != null)
                    {
                        foreach (var itemcomp in objUpd.Comboitem_Composition)
                        {
                            ComboColorItemCompositionList.Add(new Repository.Comboitem_Composition
                            {
                                StyleRowId = objUpd.StyleRowid,
                                ComboitemRowId = itemcomp.ComboitemRowId,
                                ColorSeq = itemcomp.ColorSeq,
                                ColorId = itemcomp.ColorId,
                            });
                        }
                    }
                    var ColorItemYarnresult = AddItemCompsitionDetData(ComboColorItemCompositionList, "Update");
                    //ComboItem_Composition End

                    //delete StyleImage Many Rows table
                    var deletestyleimage = entities.Buy_Ord_Img.Where(d => d.StyleRowid == objUpd.StyleRowid).ToList<Buy_Ord_Img>();
                    deletestyleimage.ForEach(c => entities.Buy_Ord_Img.Remove(c));
                    entities.SaveChanges();

                    //Image
                    var Imgdet = new List<Repository.Buy_Ord_Img>();
                    if (objUpd.Buy_Ord_Img.Count > 0)
                    {
                        foreach (var img in objUpd.Buy_Ord_Img)
                        {
                            Imgdet.Add(new Repository.Buy_Ord_Img
                            {
                                Imgpath = img.Imgpath,
                                Imgtitle = img.Imgtitle,
                                Order_no = img.Order_no,
                                StyleRowid = objUpd.StyleRowid
                            });
                        }
                    }

                    foreach (var item in Imgdet)
                    {
                        var addl = entities.Buy_Ord_Img.Add(item);
                    }
                    entities.SaveChanges();

                    //var App = entities.buy_ord_style.Where(c => c.StyleRowid == objUpd.StyleRowid).FirstOrDefault();
                    //if (App != null)
                    //{
                    //    App.order_no = objUpd.order_no;
                    //    App.Styleid = objUpd.Styleid;
                    //    App.categoryid = objUpd.categoryid;
                    //    App.quantity = objUpd.quantity;
                    //    App.price = objUpd.price;
                    //    App.value = objUpd.value;
                    //    App.job_qty = objUpd.job_qty;
                    //    App.LongDesc = objUpd.LongDesc;
                    //    App.cost_estimated = objUpd.cost_estimated;
                    //    App.styleentdate = objUpd.styleentdate;
                    //    //App.AllowancePer = objUpd.AllowancePer;
                    //    App.ProductionQty = objUpd.ProductionQty;
                    //    //App.packplan_thru = objUpd.packplan_thru;
                    //    App.Amend = objUpd.Amend;
                    //    App.Yarn_Amend = objUpd.Yarn_Amend;
                    //    App.Acc_Amend = objUpd.Acc_Amend;
                    //    App.Pack_Amend = objUpd.Pack_Amend;
                    //    App.Despatch_Closed = objUpd.Despatch_Closed;
                    //    App.despatch_qty = objUpd.despatch_qty;
                    //    //App.Unit_Type = objUpd.Unit_Type;
                    //    App.cutG_Amend = objUpd.cutG_Amend;
                    //    App.Grouped_StyleID = objUpd.Grouped_StyleID;
                    //    App.Grouped = objUpd.Grouped;
                    //    App.WORKORDER = objUpd.WORKORDER;
                    //    App.Company_Unitid = objUpd.Company_Unitid;
                    //    //App.TransferredTo = objUpd.TransferredTo;
                    //    //App.Transfer = objUpd.Transfer;
                    //    //App.Base_Unit = objUpd.Base_Unit;
                    //    App.Enquiryid = objUpd.Enquiryid;
                    //    App.BuyerArt = objUpd.BuyerArt;
                    //    //App.buyerItem = objUpd.buyerItem;
                    //    App.OpenPrgAmend = objUpd.OpenPrgAmend;
                    //    App.SampleStyleId = objUpd.SampleStyleId;
                    //    //App.shipentdate = objUpd.shipentdate;
                    //    App.SeasonId = objUpd.SeasonId;
                    //    App.GarmentGsm = objUpd.GarmentGsm;
                    //    App.ProcessUnitID = objUpd.ProcessUnitID;
                    //    App.CreatedBy = objUpd.CreatedBy;
                    //    App.mis_tmArchive = objUpd.mis_tmArchive;
                    //    App.mis_type = objUpd.mis_type;
                    //    App.Cancel = objUpd.Cancel;
                    //}

                    //The Transaction will be completed
                    txscope.Complete();
                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BuyOrdStyle-UpdateData");
                    return false;
                    throw ex;
                }
            }

        }

        public bool DeleteData(int id)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var result = false;
                    var addl = entities.buy_ord_style.Where(c => c.StyleRowid == id).FirstOrDefault();

                    //delete StyleImage Many Rows table
                    var deletestyleimage = entities.Buy_Ord_Img.Where(d => d.StyleRowid == id).ToList<Buy_Ord_Img>();
                    deletestyleimage.ForEach(c => entities.Buy_Ord_Img.Remove(c));
                    entities.SaveChanges();

                    //delete ComboColor Many Rows table
                    var deletestylecolor = entities.ComboColor.Where(d => d.StyleRowId == id).ToList<ComboColor>();
                    deletestylecolor.ForEach(c => entities.ComboColor.Remove(c));
                    entities.SaveChanges();

                    //delete ComboSize Many Rows table
                    var deletestyledet = entities.Combosize.Where(d => d.StyleRowId == id).ToList<Combosize>();
                    deletestyledet.ForEach(c => entities.Combosize.Remove(c));
                    entities.SaveChanges();

                    //delete ComboItem Many Rows table
                    var deletestyleItemdet = entities.ComboItem.Where(d => d.StyleRowId == id).ToList<ComboItem>();
                    deletestyleItemdet.ForEach(c => entities.ComboItem.Remove(c));
                    entities.SaveChanges();

                    //delete ComboItemComposition Many Rows table
                    var deletestyleItemCompdet = entities.Comboitem_Composition.Where(d => d.StyleRowId == id).ToList<Comboitem_Composition>();
                    deletestyleItemCompdet.ForEach(c => entities.Comboitem_Composition.Remove(c));
                    entities.SaveChanges();

                    if (addl != null)
                    {
                        entities.buy_ord_style.Remove(addl);
                    }
                    entities.SaveChanges();

                    //The Transaction will be completed
                    txscope.Complete();

                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BuyOrdStyle-DeleteData");
                    return false;
                    throw ex;
                }
            }

        }

        public IQueryable<BuyOrderStyle> GetTargetDataRepList(string buyormasid)
        {
            IQueryable<BuyOrderStyle> query = (from cd in entities.Proc_Apparel_GetStyleTargetMainLoad(buyormasid)
                                               select new BuyOrderStyle
                                               {

                                                   StyleRowid = (int)cd.StyleRowId,
                                                   order_no = cd.OrderNo,
                                                   OrderQuantity = cd.OrdQty,
                                                   StyQty = cd.StyQty,
                                                   //BalStyQty = (decimal)cd.BalanceOrd,
                                                   styleName = cd.Style,
                                                   BShipNo = (int)cd.bhipno,
                                                   JobcountId = (int)cd.JobCId,
                                                   StyleAmend = (int)cd.AmendCount,
                                                   StyApp=cd.StyleApproved,
                                                   ShipApp=cd.ShipApproved,
                                                   MeasCount=cd.BMeasCount,
                                                   PrecostingCount = cd.PrecostingCount,
                                                   PrecostingfabCount = cd.PrecostingfabCount,
                                                   Trimsconsumption=cd.Trimsconsumption
                                               }).AsQueryable();
            return query;
        }
        public IQueryable<BuyOrderStyle> GetDataRepList(int buyormasid)
        {
            IQueryable<BuyOrderStyle> query = (from cd in entities.Proc_Apparel_GetStyleMainLoad(buyormasid)
                                               select new BuyOrderStyle
                                               {

                                                   StyleRowid = (int)cd.StyleRowId,
                                                   order_no = cd.OrderNo,
                                                   OrderQuantity = cd.OrdQty,
                                                   StyQty = cd.StyQty,
                                                   //BalStyQty = (decimal)cd.BalanceOrd,
                                                   styleName = cd.Style,
                                                   BShipNo = (int)cd.bhipno,
                                                   JobcountId = (int)cd.JobCId,
                                                   StyleAmend = (int)cd.AmendCount,
                                                   StyApp=cd.StyleApproved,
                                                   ShipApp=cd.ShipApproved,
                                                   MeasCount=cd.BMeasCount,
                                                   PrecostingCount = cd.PrecostingCount,
                                                   PrecostingfabCount = cd.PrecostingfabCount,
                                                   Trimsconsumption=cd.Trimsconsumption,
                                                   chkrate=cd.chkrate,
                                                   AppCount = cd.Appcount
                                               }).AsQueryable();
            return query;
        }


        public IQueryable<BuyOrderStyle> GetOrderno(int BMasId)
        {
            IQueryable<BuyOrderStyle> query = (from cd in entities.Proc_Apparel_GetOrderno(BMasId)
                                               select new BuyOrderStyle
                                               {
                                                   order_no = cd.Order_No,
                                                   quantity = (decimal)cd.quantity,
                                                   buyormasid = cd.Buy_Ord_MasId


                                               }).AsQueryable();
            return query;
        }


        public IQueryable<BuyOrderStyle> GetDataRepCheckShipPlanDetails(string OrdNo, int Styleid)
        {
            IQueryable<BuyOrderStyle> query = (from a in entities.Proc_Apparel_GetBulkOrderCheckShipPlan(OrdNo, Styleid)
                                               select new BuyOrderStyle
                                           {

                                               CheckBom = (int)a.CheckBom,
                                               CheckShip = (int)a.CheckShip,


                                           }).AsQueryable();

            return query;
        }
        public IQueryable<BuyOrderStyle> GetStylerowidDetails(string OrdNo, int Styleid)
        {
            IQueryable<BuyOrderStyle> query = (from a in entities.buy_ord_style.Where(c => c.Styleid == Styleid && c.order_no == OrdNo)
                                               select new BuyOrderStyle
                                               {

                                                   Styleid = a.Styleid,
                                                   order_no = a.order_no,
                                                   StyleRowid = a.StyleRowid
                                               }).AsQueryable();

            return query;
        }


        public buy_ord_style CheckRepStyle(int Styleid, string OrdNo)
        {
            return entities.buy_ord_style.Where(c => c.Styleid == Styleid && c.order_no == OrdNo).FirstOrDefault();
        }

        public OrderStyleHeader StyleHeaderInfo(int Styleid)
        {
            return entities.StyleHeader.Where(c => c.StyleId == Styleid ).FirstOrDefault();
        }

        public IQueryable<Domain.Style> GetStyleNo(string orderno)
        {
            var query = (from a in entities.Proc_Apparel_GetStyleNumber(orderno)
                         select new Domain.Style
                         {
                           StyleId=a.Styleid,
                           StyleName=a.Style,
                           orderno=a.order_no,
                           Stylerowid=a.StyleRowid
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.BuyOrdImg> GetStlyeImglist( )
        {
            var query = (from a in entities.Proc_Apparel_GetAllStyleGalleryMainList()
                         select new Domain.BuyOrdImg
                         {
                             Imgtitle = a.Style,
                             Imgdesc = a.Description,
                             Imgpath = a.Imgpath,
                             StyleRowid=a.StyleId
                         }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.BuyOrderStyle> GetStlyeImgOrder(string Style)
        {
            IQueryable<Domain.BuyOrderStyle> query = (from a in entities.Proc_Apparel_GetStyledet(Style)
                                                      select new Domain.BuyOrderStyle
                                               {
                                                   StyleRowid = a.StyleRowid,
                                                   order_no = a.Order_No,
                                                   Ref_No = a.Ref_No,
                                                   BuyerName=a.Buyer,
                                                   price=(float)a.Rate,
                                                   Currency = a.Currency,
                                                   ExRate = (decimal)a.Exchange,
                                                   StyQty = (decimal)a.OrderQty,
                                                   despatch_qty = (float)a.despatch_qty,
                                                   Description = a.StyDesc,
                                                   FabricDet = a.FabricDet,
                                                   Styleid = a.Styleid,
                                                   styleName = a.Style,
                                                   Company=a.Company

                                               }).AsQueryable();

            return query;
        }



        public IQueryable<Domain.BuyOrdImg> GetStlyeImgdet(string Style, string Orderno)
        {
            var query = (from a in entities.Proc_Apparel_GetStyleGalleryDet(Style, Orderno)
                         select new Domain.BuyOrdImg
                         {
                             Imgtitle = a.Style,
                             Imgdesc = a.Description,
                             Imgpath = a.Imgpath,
                             StyleRowid = a.StyleId
                         }).AsQueryable();
            return query;
        }



    }
}
