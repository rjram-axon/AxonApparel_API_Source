using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class GarmentItemBusiness : IGarmentItemBusiness
    {
        private IGarmentItemRepository strrep = new GarmentItemRepository();
        public Response<IQueryable<BuyOrderStyle>> GetBuyOrderItemLoad(int buyormasid)
        {
            try
            {
                var CurDetList = strrep.GetDataRepList(buyormasid);

                return new Response<IQueryable<BuyOrderStyle>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        //public Response<IEnumerable<Domain.Ord_styleTempMas>> GetOrderStyleTempLateDDL()
        //{
        //    try
        //    {
        //        var ProductWO = strrep.GetDllList();

        //        return new Response<IEnumerable<Domain.Ord_styleTempMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
        //        //return res;
        //    }
        //    catch (Exception)
        //    {
        //        return new Response<IEnumerable<Domain.Ord_styleTempMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
        //    }
        //}

        public Response<IEnumerable<Domain.Ord_styleTempMas>> GetOrderStyleTempLateDDL()
        {
            try
            {
                var GroupNameList = strrep.GetDllList();
                return new Response<IEnumerable<Domain.Ord_styleTempMas>>(GroupNameList.Select(m => new Domain.Ord_styleTempMas
                {
                    Ord_MasId = m.Ord_MasId,
                    TemplateId = m.TemplateId,
                    Order_No = m.Order_No,
                    style_ID = m.style_ID,
                    Style = m.Style,
                    GItemId = m.GItemId,
                    GItem = m.GItem,
                    BuyerId = m.BuyerId,
                    Buyer = m.Buyer,
                    Template = m.Template,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Ord_styleTempMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Ord_styleTempDet>> GetStyleTemp(int id)
        {
            try
            {
                var ProductWO = strrep.GetStyleTemp(id);


                return new Response<IQueryable<Domain.Ord_styleTempDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Ord_styleTempDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.Ord_styleTempDet>> GetOrderStyleTemp(int id)
        {
            try
            {
                var ProductWO = strrep.GetOrderStyleTemp(id);


                return new Response<IQueryable<Domain.Ord_styleTempDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Ord_styleTempDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<bool> UpdateOrderStyleTemplate(Domain.Ord_styleTempMas Ord_styleTempDet)
        {
            //StyleTemplateDet Begin
            var StyleTemDet = new List<Repository.Ord_styleTempDet>();

            if (Ord_styleTempDet.ordStyleTempDet.Count > 0)
            {
                foreach (var styletemp in Ord_styleTempDet.ordStyleTempDet)
                {
                    StyleTemDet.Add(new Repository.Ord_styleTempDet
                    {
                        TempDetId = Ord_styleTempDet.TemDetId,
                        TemplateId = Ord_styleTempDet.TemplateId,
                        SizeId = styletemp.DSizeId,
                        ItemId = styletemp.DItemId,
                        ColorId = styletemp.DColorId,
                        SupplierId = styletemp.DSupplierId,
                        ConvertTypeId = styletemp.DConvertTypeId,
                        ConvertTypeName = styletemp.DConvertTypeName,
                        GSizeid = 0,
                        GColorid = 0,
                        Qty = styletemp.DQty,
                        Rate = styletemp.DRate,
                        Type = styletemp.DTypeval,
                    });
                }
            }

            var res = strrep.UpdateData(new Repository.Ord_styleTempMas
            {
                Ord_MasId = Ord_styleTempDet.Ord_MasId,
                Order_No = Ord_styleTempDet.Order_No,
                style_ID = Ord_styleTempDet.style_ID,
                Style = Ord_styleTempDet.Style,
                GItem = Ord_styleTempDet.GItem,
                TemplateId = Ord_styleTempDet.TemplateId,
                Template = Ord_styleTempDet.Template,
                BuyerId = Ord_styleTempDet.BuyerId,
                Buyer = Ord_styleTempDet.Buyer,
                GItemId = Ord_styleTempDet.GItemId,
                Ord_styleTempDet = StyleTemDet,
            });            

            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        }
        public Response<bool> DeleteData(int id)
        {
            return new Response<bool>(strrep.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }
        public Response<int> CreateOrderStyleTemplate(Domain.Ord_styleTempMas Ord_styleTempDet)
        {
            
                var StyleTemDet = new List<Repository.Ord_styleTempDet>();


                foreach (var styletemp in Ord_styleTempDet.ordStyleTempDet)
                {
                    StyleTemDet.Add(new Repository.Ord_styleTempDet
                    {                    
                        TempDetId = Ord_styleTempDet.TemDetId,
                        TemplateId = Ord_styleTempDet.TemplateId,
                        SizeId = styletemp.DSizeId,
                        ItemId = styletemp.DItemId,
                        ColorId = styletemp.DColorId,
                        SupplierId = styletemp.DSupplierId,
                        ConvertTypeId = styletemp.DConvertTypeId,
                        ConvertTypeName = styletemp.DConvertTypeName,
                        GSizeid = 0,
                        GColorid = 0,
                        Qty = styletemp.DQty,
                        Rate = styletemp.DRate,
                        Type = styletemp.DTypeval,
                    });
                }


                var BuyOrderId = strrep.AddData(new Repository.Ord_styleTempMas
                {
                    Ord_MasId = Ord_styleTempDet.Ord_MasId,
                    Order_No = Ord_styleTempDet.Order_No,
                    style_ID = Ord_styleTempDet.style_ID,
                    Style = Ord_styleTempDet.Style,
                    GItem = Ord_styleTempDet.GItem,
                    TemplateId = Ord_styleTempDet.TemplateId,
                    Template = Ord_styleTempDet.Template,
                    BuyerId = Ord_styleTempDet.BuyerId,
                    Buyer = Ord_styleTempDet.Buyer,
                    GItemId = Ord_styleTempDet.GItemId,
                    Ord_styleTempDet = StyleTemDet,
                });
                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
         
        }

       
        public Response<IQueryable<BuyOrderStyle>> GetGarmentOrderNoList(int BMasId)
        {
            try
            {
                var couList = strrep.GetGarmentOrderNo(BMasId);

                return new Response<IQueryable<Domain.BuyOrderStyle>>(couList.Select(m => new Domain.BuyOrderStyle
                {

                    order_no = m.order_no,
                    quantity = (int)m.quantity,
                    buyormasid = m.buyormasid

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<IQueryable<Domain.Ord_styleTempDet>> GetDataCheckPlanTempDetails(int tempid, int tempdetid)
        {
            try
            {
                var ProdutWO = strrep.GetDataRepCheckTempOrderDetails(tempid, tempdetid);

                return new Response<IQueryable<Domain.Ord_styleTempDet>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Ord_styleTempDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

      
    }
}
