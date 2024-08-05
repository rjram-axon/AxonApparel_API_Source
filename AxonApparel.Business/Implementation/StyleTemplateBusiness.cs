using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class StyleTemplateBusiness:IStyleTemplateBusiness
    {

        private IStyleTemplateRepository styleTempRepo = new StyleTemplateRepository();

        public Response<IEnumerable<Domain.StyleTemplateMas>> GetStyleTemplate()
        {
            try
            {
                var ProductWO = styleTempRepo.GetDataMainList();

                return new Response<IEnumerable<Domain.StyleTemplateMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.StyleTemplateMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateStyleTemplate(Domain.StyleTemplateMas StyleTemp)
        {
            if (isNameAvailableAlready(StyleTemp, "ADD")) return new Response<int>(-1, Status.ERROR, "Given Template is already available");
            try
            {              
                var StyleTemDet = new List<Repository.StyleTempDet>();
               
                foreach (var styletemp in StyleTemp.StyleTempDet)
                {
                    StyleTemDet.Add(new Repository.StyleTempDet
                    {                        
                        SizeId = styletemp.SizeId,
                        ItemId = styletemp.ItemId,
                        ColorId = styletemp.ColorId,                        
                        SupplierId = styletemp.SupplierId,
                        ConvertTypeId = styletemp.ConvertTypeId,
                        ConvertTypeName = styletemp.ConvertTypeName,
                        GSizeid=0,
                        GColorid=0,
                        Qty = styletemp.Qty,
                        Rate = styletemp.Rate,
                        Type=styletemp.Typeval,
                    });
                }

                var BuyOrderId = styleTempRepo.AddData(new Repository.StyleTempMas
                {
                    TemplateId = StyleTemp.TemplateId,
                    Template = StyleTemp.Template,                 
                    BuyerId=StyleTemp.BuyerId,
                    ItemId=StyleTemp.ItemId,
                    StyleTempDet = StyleTemDet    
                
                });
               
                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateStyleTemplate(Domain.StyleTemplateMas StyleUpd)
        {
            //StyleTemplateDet Begin
            var StyleTemDet = new List<Repository.StyleTempDet>();

            if (StyleUpd.StyleTempDet.Count > 0)
            {
                foreach (var styletemp in StyleUpd.StyleTempDet)
                {
                    StyleTemDet.Add(new Repository.StyleTempDet
                    {
                        SizeId = styletemp.SizeId,
                        ItemId = styletemp.ItemId,
                        ColorId = styletemp.ColorId,
                        SupplierId = styletemp.SupplierId,
                        ConvertTypeId = styletemp.ConvertTypeId,
                        ConvertTypeName = styletemp.ConvertTypeName,
                        GSizeid = 0,
                        GColorid = 0,
                        Qty = styletemp.Qty,
                        Rate = styletemp.Rate,
                        Type = styletemp.Typeval,
                    });
                }
            }

            var res = styleTempRepo.UpdateData(new Repository.StyleTempMas
            {
                TemplateId=StyleUpd.TemplateId,
                Template = StyleUpd.Template,
                BuyerId = StyleUpd.BuyerId,
                ItemId = StyleUpd.ItemId,
                StyleTempDet = StyleTemDet
            });            

            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        }

        public Response<Domain.StyleTemplateMas> GetStyleTempId(int StyleTempId)
        {
            try
            {
                var str = styleTempRepo.GetDataById(StyleTempId);
                return new Response<Domain.StyleTemplateMas>(new Domain.StyleTemplateMas
                {
                    TemplateId=str.TemplateId,
                    Template = str.Template,
                    BuyerId=(int)str.BuyerId,                    
                    ItemId=(int)str.ItemId,
                    StyleTempDet = str.StyleTempDet.Select(h => new Domain.StyleTemplateDet()
                    {
                        Sno=0,
                        TemDetId=h.TempDetId,
                        TemplateId = h.TemplateId,                      
                        SupplierId=(int)h.SupplierId,
                        //SupplierName=h.Supplier.Supplier1,                      
                        ItemId = (int)h.ItemId,  
                        Item=h.Item.Item1,
                        ColorId = (int)h.ColorId,
                        Color=h.Color.Color1,
                        SizeId = (int)h.SizeId,
                        //Size=h.Size.size1,
                        Qty=h.Qty,
                        Rate=h.Rate,
                        ConvertTypeId=(int)h.ConvertTypeId,
                        ConvertTypeName=h.ConvertTypeName,
                        GColorId=(int)h.GColorid,
                        GColor = (h.Color.Colorid==h.GColorid)?h.Color.Colorname:"",
                        GSizeId=(int)h.GSizeid,
                       // GSize = (h.Size.SizeId == h.GSizeid) ? h.Size.size1 : ""
                    }).Where(x => x.TemplateId == StyleTempId).ToList(),
                    
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.StyleTemplateMas>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }


        public Response<IQueryable<Domain.StyleTemplateDet>> GetStyleTemp(int id)
        {
            try
            {
                var ProductWO = styleTempRepo.GetStyleTemp(id);


                return new Response<IQueryable<Domain.StyleTemplateDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StyleTemplateDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        private bool isNameAvailableAlready(Domain.StyleTemplateMas StyleTemp, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetStyleTemplate().Value.Where(c => c.Template.ToUpper() == StyleTemp.Template.ToUpper()).ToList().Count > 0);
                //return (GetStyleTemplate().Value.Where(c => c.Template.ToUpper() == StyleTemp.Template.ToUpper() && c.BuyerId == StyleTemp.BuyerId && c.ItemId == StyleTemp.ItemId).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetStyleTemplate().Value.Where(c => c.BuyerId == StyleTemp.BuyerId && c.ItemId == StyleTemp.ItemId  && c.BuyerId != StyleTemp.BuyerId).ToList().Count > 0);
            }
            return false;
        }

        public Response<bool> DeleteData(int id)
        {
            return new Response<bool>(styleTempRepo.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
