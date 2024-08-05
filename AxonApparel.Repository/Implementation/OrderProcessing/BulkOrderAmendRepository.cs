using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BulkOrderAmendRepository:IBulkOrderAmendRepository
    {
        OrderEntities entities = new OrderEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public bool UpdateData(buy_ord_style objUpd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //var result = false;
                    Repository.buy_ord_style buyordsty = new Repository.buy_ord_style();

                    //var App = entities.buy_ord_style.Where(c => c.StyleRowid == objUpd.StyleRowid).FirstOrDefault();
                    //if (App != null)
                    //{
                    //    //if (objUpd != null)
                    //    //{
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
                    //    //App.WORKORDER = objUpd.WORKORDER;
                    //    //App.Company_Unitid = objUpd.Company_Unitid;
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
                    //    App.CurrencyId = objUpd.CurrencyId;
                    //    App.Exchange = objUpd.Exchange;
                    //    App.CAD_Weight = objUpd.CAD_Weight;
                    //    App.CAD_Percentage = objUpd.CAD_Percentage;
                    //    App.PA = objUpd.PA;
                    //    App.Description = objUpd.Description;
                    //}
                    //entities.SaveChanges();

                    ////Update OrderMas Currency

                    //var AppU = entities.Buy_Ord_Mas.Where(c => c.Order_No == objUpd.order_no).FirstOrDefault();
                    //if (AppU != null)
                    //{
                    //    AppU.CurrencyId = objUpd.CurrencyId;
                    //    AppU.Exchange = objUpd.Exchange;

                    //}
                    //entities.SaveChanges();

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
    }
}
