using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class GarmentItemRepository : IGarmentItemRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IQueryable<BuyOrderStyle> GetDataRepList(int buyormasid)
        {
            IQueryable<BuyOrderStyle> query = (from cd in entities.Proc_Apparel_GetGarmentItemMainLoad(buyormasid)
                                               select new BuyOrderStyle
                                               {
                                                   order_no = cd.ordeR_no,
                                                   styleName = cd.Style,
                                                   Styleid = cd.StyleId,
                                                   buyerItem = cd.item,
                                                   GItem_Id = (int)cd.itemid,
                                                   Buyerid = cd.BuyerId,
                                                   BuyerName = cd.Buyer,
                                                   StyleRowid = (int)cd.StyleRowId,
                                                   Template_Id = (int)cd.TemplateId,
                                                   Template1 = cd.Template,
                                                   ItemCount = (int)cd.ItemCount,
                                                   GCount = (int)cd.GCount


                                               }).AsQueryable();
            return query;
        }

        public IEnumerable<Ord_styleTempMas> GetDllList()
        {
            //var query = (from YD in entities.Ord_styleTempMas
            //             select new Domain.Ord_styleTempMas
            //             {
            //                 TemplateId = YD.TemplateId,
            //                 Template = YD.Template,
            //                 BuyerId = (int)YD.BuyerId,
            //                 GItemId = (int)YD.GItemId,
            //             }).AsQueryable();
            //return query;
            List<Ord_styleTempMas> lstemployee = new List<Ord_styleTempMas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterOrd_styleTempMasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Ord_styleTempMas employee = new Ord_styleTempMas();

                    employee.TemplateId = Convert.ToInt32(rdr["TemplateId"]);
                    employee.Template = rdr["Template"].ToString();
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.GItemId = Convert.ToInt32(rdr["GItemId"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public bool UpdateData(Repository.Ord_styleTempMas objUpd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Ord_styleTempMas.Where(c => c.TemplateId == objUpd.TemplateId).FirstOrDefault();
                    if (App != null)
                    {
                        App.Ord_MasId = objUpd.Ord_MasId;
                        App.Order_No = objUpd.Order_No;
                        App.style_ID = objUpd.style_ID;
                        App.Style = objUpd.Style;
                        App.GItemId = objUpd.GItemId;
                        App.GItem = objUpd.GItem;
                        App.BuyerId = objUpd.BuyerId;
                        App.Buyer = objUpd.Buyer;
                        App.Template = objUpd.Template;
                    }
                    entities.SaveChanges();

                    //StyleTempDet Begin
                    var StyleTempDet = new List<Repository.Ord_styleTempDet>();

                    if (objUpd.Ord_styleTempDet.Count > 0)
                    {
                        foreach (var item in objUpd.Ord_styleTempDet)
                        {
                            StyleTempDet.Add(new Repository.Ord_styleTempDet
                            {
                                TemplateId = objUpd.TemplateId,
                                ItemId = item.ItemId,
                                SizeId = item.SizeId,
                                ColorId = item.ColorId,
                                SupplierId = item.SupplierId,
                                Supplier = item.Supplier,
                                ConvertTypeId = item.ConvertTypeId,
                                ConvertTypeName = item.ConvertTypeName,
                                Qty = item.Qty,
                                Rate = item.Rate,
                                GColorid = (item.GColorid == 0 ? null : item.GColorid),
                                GSizeid = (item.GSizeid == 0 ? null : item.GSizeid),
                                Type = item.Type,
                            });
                        }
                    }

                    var result = AddStyleDetData(StyleTempDet, "Update");
                    //StyleTempDet End

                    //The Transaction will be completed
                    txscope.Complete();
                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OrderStyleTemplate-UpdateData");
                    return false;
                    throw ex;
                }
            }
        }
        public IQueryable<Domain.Ord_styleTempDet> GetStyleTemp(int id)
        {

            IQueryable<Domain.Ord_styleTempDet> query = (from T in entities.Proc_Apparel_GetStyleTemplate(id)
                                                         select new Domain.Ord_styleTempDet
                                                         {
                                                             DTempDetId = T.TempDetId,
                                                             DTemplateId = T.TemplateId,
                                                             DTemplate = T.Template,
                                                             DColorId = T.ColorId,
                                                             DColor = T.Color,
                                                             DSizeId = T.SizeId,
                                                             DQty = T.Qty,
                                                             DRate = T.Rate,
                                                             DBuyerId = (int)T.BuyerId,
                                                             DBuyerName = entities.Buyer.Where(e => e.BuyerId == T.BuyerId).Select(i => i.Buyer1).FirstOrDefault(),
                                                             DGItemId = (int)T.GItemId,
                                                             DGItem = entities.Item.Where(e => e.ItemId == T.GItemId).Select(i => i.Item1).FirstOrDefault(),
                                                             DGColorId = (int)(T.GColorid == null ? 0 : T.GColorid),
                                                             DSupplierId = (int)T.SupplierId,
                                                             DSupplierName = entities.Supplier.Where(e => e.SupplierId == T.SupplierId).Select(i => i.Supplier1).FirstOrDefault(),
                                                             DConvertTypeId = (int)T.ConvertTypeId,
                                                             DConvertTypeName = T.ConvertTypeName,
                                                             DGColor = (T.Gcolor == null ? string.Empty : T.Gcolor),
                                                             DGSizeId = (int)(T.GSizeid == null ? 0 : T.GSizeid),
                                                             DGSize = (T.GSize == null ? string.Empty : T.GSize),
                                                             DTypeval = T.Type,
                                                             DSize = entities.Size.Where(e => e.SizeId == T.SizeId).Select(i => i.size1).FirstOrDefault(),
                                                             DSno = 0,
                                                             DItemId = (int)T.ItemId,
                                                             DItem = entities.Item.Where(e => e.ItemId == T.ItemId).Select(i => i.Item1).FirstOrDefault(),
                                                         }).AsQueryable();
            return query;

        }
        public bool AddStyleDetData(List<Ord_styleTempDet> objCDet, string Mode)
        {
            try
            {
                int Templateid = 0;

                if (Mode == "Update")
                {
                    foreach (var item in objCDet)
                    {
                        Templateid = (int)item.TemplateId;

                    }

                    //delete StyleTempDet Many Rows table
                    var deletestyletemdet = entities.Ord_styleTempDet.Where(d => d.TemplateId == Templateid).ToList<Ord_styleTempDet>();
                    deletestyletemdet.ForEach(c => entities.Ord_styleTempDet.Remove(c));
                    entities.SaveChanges();
                }

                foreach (var item in objCDet)
                {
                    entities.Ord_styleTempDet.Add(item);
                }
                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IQueryable<Domain.Ord_styleTempDet> GetOrderStyleTemp(int id)
        {

            IQueryable<Domain.Ord_styleTempDet> query = (from T in entities.Proc_Apparel_Get_Ord_styleTemplate(id)
                                                         select new Domain.Ord_styleTempDet
                                                  {
                                                      DTempDetId = T.TempDetId,
                                                      DTemplateId = T.TemplateId,
                                                      DTemplate = T.Template,
                                                      DColorId = T.ColorId,
                                                      DColor = T.Color,
                                                      DSizeId = T.SizeId,
                                                      DQty = T.Qty,
                                                      DRate = T.Rate,
                                                      DBuyerId = (int)T.BuyerId,
                                                      DBuyerName = entities.Buyer.Where(e => e.BuyerId == T.BuyerId).Select(i => i.Buyer1).FirstOrDefault(),
                                                      DGItemId = (int)T.GItemId,
                                                      DGItem = entities.Item.Where(e => e.ItemId == T.GItemId).Select(i => i.Item1).FirstOrDefault(),
                                                      DGColorId = (int)(T.GColorid == null ? 0 : T.GColorid),
                                                      DSupplierId = (int)T.SupplierId,
                                                      DSupplierName = entities.Supplier.Where(e => e.SupplierId == T.SupplierId).Select(i => i.Supplier1).FirstOrDefault(),
                                                      DConvertTypeId = (int)T.ConvertTypeId,
                                                      DConvertTypeName = T.ConvertTypeName,
                                                      DGColor = (T.Gcolor == null ? string.Empty : T.Gcolor),
                                                      DGSizeId = (int)(T.GSizeid == null ? 0 : T.GSizeid),
                                                      DGSize = (T.GSize == null ? string.Empty : T.GSize),
                                                      DTypeval = T.Type,
                                                      DSize = entities.Size.Where(e => e.SizeId == T.SizeId).Select(i => i.size1).FirstOrDefault(),
                                                      DSno = 0,
                                                      DItemId = (int)T.ItemId,
                                                      DItem = entities.Item.Where(e => e.ItemId == T.ItemId).Select(i => i.Item1).FirstOrDefault(),
                                                  }).AsQueryable();
            return query;

        }
        public bool AddData(Ord_styleTempMas objAdd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    Repository.Ord_styleTempMas stytempmas = new Repository.Ord_styleTempMas();
                    if (objAdd != null)
                    {

                        stytempmas.Ord_MasId = objAdd.Ord_MasId;
                        stytempmas.Order_No = objAdd.Order_No;
                        stytempmas.style_ID = objAdd.style_ID;
                        stytempmas.Style = objAdd.Style;
                        stytempmas.GItemId = objAdd.GItemId;
                        stytempmas.GItem = objAdd.GItem;
                        stytempmas.BuyerId = objAdd.BuyerId;
                        stytempmas.Buyer = objAdd.Buyer;
                        stytempmas.Template = objAdd.Template;
                    }

                    var sid = entities.Ord_styleTempMas.Add(stytempmas);
                    entities.SaveChanges();

                    //StyleTempDet Start
                    var styletempdet = new List<Repository.Ord_styleTempDet>();



                    foreach (var styledet in objAdd.Ord_styleTempDet)
                    {
                        styletempdet.Add(new Repository.Ord_styleTempDet
                        {

                            TemplateId = sid.TemplateId,
                            SizeId = styledet.SizeId,
                            ItemId = styledet.ItemId,
                            ColorId = styledet.ColorId,
                            SupplierId = styledet.SupplierId,
                            ConvertTypeId = styledet.ConvertTypeId,
                            ConvertTypeName = styledet.ConvertTypeName,
                            Qty = styledet.Qty,
                            Rate = styledet.Rate,
                            GColorid = (styledet.GColorid == 0 ? null : styledet.GColorid),
                            GSizeid = (styledet.GSizeid == 0 ? null : styledet.GSizeid),
                            Type = styledet.Type,
                        });
                    }

                    foreach (var styledetails in styletempdet)
                    {
                        var det = entities.Ord_styleTempDet.Add(styledetails);
                        entities.SaveChanges();
                    }
                    //StyleTempDet End

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;

                    //return id.StyleRowid;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OrderStyleTemplate-AddData");
                    return false;
                    throw ex;
                }
            }
        }
        public bool DeleteData(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Ord_styleTempDet.Where(c => c.TemplateId == id).ToList();
                    if (cou != null)
                    {
                        //entities.StyleTempDet.Remove(cou);
                        cou.ForEach(c => entities.Ord_styleTempDet.Remove(c));
                    }
                    entities.SaveChanges();

                    //Mas
                    var cou1 = entities.Ord_styleTempMas.Where(c => c.TemplateId == id).FirstOrDefault();
                    if (cou1 != null)
                    {
                        entities.Ord_styleTempMas.Remove(cou1);
                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OrderStyleTemplate-DeleteData");
                }

            }
            return reserved;
        }
        public IQueryable<BuyOrderStyle> GetGarmentOrderNo(int BMasId)
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


        public IQueryable<Domain.Ord_styleTempDet> GetDataRepCheckTempOrderDetails(int tempid, int tempdetid)
        {
            IQueryable<Domain.Ord_styleTempDet> query = (from a in entities.Proc_Apparel_Get_Ord_EditstyleTemplateValidate(tempid, tempdetid)
                                                         select new Domain.Ord_styleTempDet
                                           {

                                               CheckOrdTemp = (int)a.ChkPlanItem,
                                               DItemId = (int)a.ItemId,


                                           }).AsQueryable();

            return query;
        }
    }
}
