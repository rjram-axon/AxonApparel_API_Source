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
    public class OrderItemdetailsBusiness : IOrderItemDetailsBusiness
    {
        private IOrderItemDetailsRepository strrep = new OrderItemDetailsRepository();
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
        public Response<IQueryable<Domain.Ord_styleTempMas>> GetOrderStyleTempLateDDL()
        {
            try
            {
                var ProductWO = strrep.GetDllList();

                return new Response<IQueryable<Domain.Ord_styleTempMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Ord_styleTempMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
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
        public Response<bool> UpdateOrderStyleTemplate(Domain.OrdCons_Mas Ord_styleTempDet)
        {
            //StyleTemplateDet Begin
           

            //var ProcessDet = new List<Repository.OrdCons_ProcSeq>();
            var YarnFabDet = new List<Domain.OrdCons_YarnFab>();
            var ProcessDet = new List<Domain.OrdCons_ProcSeq>();
            foreach (var ordprocessitm in Ord_styleTempDet.ordProcessDet)
            {
                ProcessDet.Add(new Domain.OrdCons_ProcSeq
                {
                    ordconsprocessmasid = ordprocessitm.ordconsprocessmasid,
                    ordconsmasid = ordprocessitm.ordconsmasid,
                    ordconsprocessid = ordprocessitm.ordconsprocessid,
                    ordconsprocessloss = ordprocessitm.ordconsprocessloss,

                });
            }

            foreach (var ordyarnitm in Ord_styleTempDet.ordItemDet)
            {
                YarnFabDet.Add(new Domain.OrdCons_YarnFab
                {
                    ordconsyarnfabmasid = ordyarnitm.ordconsyarnfabmasid,
                    ordconsmasid = ordyarnitm.ordconsmasid,
                    ordconsitemtype = ordyarnitm.ordconsitemtype,
                    ordconsitemid = ordyarnitm.ordconsitemid,

                });
            }


            var OrderitemdetId = new Domain.OrdCons_Mas
            {
                ordconsmasid = Ord_styleTempDet.ordconsmasid,
                ordconsavggramage = Ord_styleTempDet.ordconsavggramage,
                GarmentItemid = Ord_styleTempDet.GarmentItemid,
                StyleRowId = Ord_styleTempDet.StyleRowId
            };
            var result = strrep.UpdateData(OrderitemdetId, ProcessDet, YarnFabDet);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");




        }
        public Response<bool> DeleteData(int id)
        {
            return new Response<bool>(strrep.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }
        //public Response<int> CreateOrderStyleTemplate(Domain.Ord_styleTempMas Ord_styleTempDet)
        //{

        //    var StyleTemDet = new List<Repository.Ord_styleTempDet>();


        //    foreach (var styletemp in Ord_styleTempDet.ordStyleTempDet)
        //    {
        //        StyleTemDet.Add(new Repository.Ord_styleTempDet
        //        {
        //            TempDetId = Ord_styleTempDet.TemDetId,
        //            TemplateId = Ord_styleTempDet.TemplateId,
        //            SizeId = styletemp.DSizeId,
        //            ItemId = styletemp.DItemId,
        //            ColorId = styletemp.DColorId,
        //            SupplierId = styletemp.DSupplierId,
        //            ConvertTypeId = styletemp.DConvertTypeId,
        //            ConvertTypeName = styletemp.DConvertTypeName,
        //            GSizeid = 0,
        //            GColorid = 0,
        //            Qty = styletemp.DQty,
        //            Rate = styletemp.DRate,
        //            Type = styletemp.DTypeval,
        //        });
        //    }


        //    var BuyOrderId = strrep.AddData(new Repository.Ord_styleTempMas
        //    {
        //        Ord_MasId = Ord_styleTempDet.Ord_MasId,
        //        Order_No = Ord_styleTempDet.Order_No,
        //        style_ID = Ord_styleTempDet.style_ID,
        //        Style = Ord_styleTempDet.Style,
        //        GItem = Ord_styleTempDet.GItem,
        //        TemplateId = Ord_styleTempDet.TemplateId,
        //        Template = Ord_styleTempDet.Template,
        //        BuyerId = Ord_styleTempDet.BuyerId,
        //        Buyer = Ord_styleTempDet.Buyer,
        //        GItemId = Ord_styleTempDet.GItemId,
        //        Ord_styleTempDet = StyleTemDet,
        //    });
        //    return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

        //}

        public Response<bool> CreateOrderStyleTemplate(Domain.OrdCons_Mas orditmdet)
        {

            //var ProcessDet = new List<Repository.OrdCons_ProcSeq>();
            var YarnFabDet = new List<Domain.OrdCons_YarnFab>();
             var ProcessDet = new List<Domain.OrdCons_ProcSeq>();
            foreach (var ordprocessitm in orditmdet.ordProcessDet)
            {
                ProcessDet.Add(new Domain.OrdCons_ProcSeq
                {
                    ordconsprocessmasid = ordprocessitm.ordconsprocessmasid,
                    ordconsmasid = ordprocessitm.ordconsmasid,
                    ordconsprocessid = ordprocessitm.ordconsprocessid,
                    ordconsprocessloss = ordprocessitm.ordconsprocessloss,
                   
                });
            }

            foreach (var ordyarnitm in orditmdet.ordItemDet)
            {
                YarnFabDet.Add(new Domain.OrdCons_YarnFab
                {
                    ordconsyarnfabmasid = ordyarnitm.ordconsyarnfabmasid,
                    ordconsmasid = ordyarnitm.ordconsmasid,
                    ordconsitemtype = ordyarnitm.ordconsitemtype,
                    ordconsitemid = ordyarnitm.ordconsitemid,

                });
            }


            var OrderitemdetId = new Domain.OrdCons_Mas
            {
                ordconsmasid = orditmdet.ordconsmasid,
                ordconsavggramage = orditmdet.ordconsavggramage,
                GarmentItemid = orditmdet.GarmentItemid,
                BmasId = orditmdet.BmasId,
                StyleRowId = orditmdet.StyleRowId
            };
            var result = strrep.AddData(OrderitemdetId, ProcessDet, YarnFabDet);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

        }





        public Response<IQueryable<Domain.OrdCons_Mas>> GetGarmentOrderNoList(int BMasId)
        {
            try
            {
                var couList = strrep.GetGarmentOrderNo(BMasId);
             
                return new Response<IQueryable<Domain.OrdCons_Mas>>(couList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.OrdCons_Mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.OrdCons_ProcSeq>> processdet(int conmasid)
        {
            try
            {
                var couList = strrep.processdet(conmasid);

                return new Response<IQueryable<Domain.OrdCons_ProcSeq>>(couList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.OrdCons_ProcSeq>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.OrdCons_YarnFab>> yarnfabdet(int conmasid)
        {
            try
            {
                var couList = strrep.yarnfabdet(conmasid);

                return new Response<IQueryable<Domain.OrdCons_YarnFab>>(couList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.OrdCons_YarnFab>>(null, Status.ERROR, "OOPS error occured. Plase try again");
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
