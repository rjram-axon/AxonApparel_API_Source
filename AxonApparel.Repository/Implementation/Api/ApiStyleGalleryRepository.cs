using AxonApparel.Domain;
using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Implementation.Api
{
    public class ApiStyleGalleryRepository : IApiStyleGalleryRepository
    {
        OrderEntities entities = new OrderEntities();      

        public IQueryable<BuyOrdImg> GetStyleimagelist()
        {
            var query = (from a in entities.Proc_Apparel_GetAllStyleGalleryMainList()
                         select new Domain.BuyOrdImg
                         {
                             Imgtitle = a.Style,
                             Imgdesc = a.Description,
                             Imgpath = a.Imgpath,
                             StyleRowid = a.StyleId
                         }).AsQueryable();
            return query;
        }
        public IQueryable<Proc_GetStyleDetails_Result> GetStyledetails(int styleid)
        {
            var query = (from a in entities.Proc_GetStyleDetails(styleid)
                         select new Repository.Proc_GetStyleDetails_Result
                         {
                             buyer = a.buyer,
                             order_no = a.order_no,
                             Ref_No = a.Ref_No,
                             style = a.style,
                             Quantity = a.Quantity,
                             Description = a.Description,
                             color = a.color,
                             size = a.size,
                             OrderQty = a.OrderQty,
                             Productionqty = a.Productionqty,
                             DespQty = a.DespQty,
                             Imgpath = a.Imgpath
                         }).AsQueryable();
            return query;
        }
    }
}
