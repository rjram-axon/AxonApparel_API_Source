using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;


namespace AxonApparel.Business
{
    public class StyleBusiness : IStyleBusiness
    {
        private IStyleRepository styleRepo = new StyleRepository();

        //public Response<IQueryable<Domain.Style>> GetStyle()
        //{
        //    try
        //    {
        //        var couList = styleRepo.GetDataList();

        //        return new Response<IQueryable<Domain.Style>>(couList.Select(m => new Domain.Style
        //        {
        //            IsActive = m.IsActive ? "TRUE" : "FALSE",
        //            ArticleNo = (m.ArticleNo == null ? "" : m.ArticleNo),//m.ArticleNo,
        //            Season = (m.Season == null ? "" : m.Season),// m.Season,
        //            DesignName = (m.DesignName == null ? "" : m.DesignName),//m.DesignName,
        //            StyleId = (int)(m.StyleId == null ? 0 : m.StyleId),
        //            StyleName = (m.Style == null ? "" : m.Style),
        //            itemid = (int)(m.Itemid == null ? 0 : m.Itemid),//(int)(m.Itemid==null?0:m.Itemid)
                    
        //          }), Status.SUCCESS, "Fetched Successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<IQueryable<Domain.Style>>(null, Status.ERROR, "OOPS error occured. Please try again");
        //    }
        //}

        public Common.Response<IQueryable<Domain.Style>> GetStyle()
        {
            try
            {
                var ProductWO = styleRepo.GetDataMainList();

                return new Response<IQueryable<Domain.Style>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Style>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<Domain.Style> GetStyleId(int styleId)
        {
            try
            {
                var sty = styleRepo.GetDataById(styleId);

                //var res= new Response <Domain.Style>(new Domain.Style
                return new Response<Domain.Style>(new Domain.Style
                {
                    //IsActive = sty.IsActive ? "TRUE" : "FALSE",
                    //ArticleNo = sty.ArticleNo,
                    //Season = sty.Season,
                    //DesignName = sty.DesignName,
                    //StyleName = sty.Style,
                    //StyleId = sty.StyleId,
                    // itemid=(int)sty.Itemid,
                    //StyleDet = sty.StyleDetails.Select(h => new Domain.StyleDetail()
                    //{
                    //    Id = h.Id,
                    //    ItemId = h.ItemId,
                    //    Qty = h.Qty,
                    //    ItemName = h.Item.Item1,
                    //    StyleId = h.StyleId
                    //}).OrderBy(d=>d.Id).ToList(),
                    IsActive = sty.IsActive ? "TRUE" : "FALSE",
                    ArticleNo = (sty.ArticleNo == null ? "" : sty.ArticleNo),//m.ArticleNo,
                    Season = (sty.Season == null ? "" : sty.Season),// m.Season,
                    DesignName = (sty.DesignName == null ? "" : sty.DesignName),//m.DesignName,
                    StyleId = sty.StyleId,
                    StyleName = sty.Style,
                    itemid = (int)(sty.Itemid == null ? 0 : sty.Itemid),//(int)(m.Itemid==null?0:m.Itemid)
                }, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<Domain.Style>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Response<int> CreateStyle(Domain.Style StyleAdd)
        {
            try
            {

                int? IId = 0;

                if (StyleAdd.itemid == 0)
                {
                    IId = null;
                }
                else
                {
                    IId = StyleAdd.itemid;
                }

                if (string.IsNullOrEmpty(StyleAdd.StyleName))
                    return new Response<int>(0, Status.ERROR, "Given Style is empty");
                if (isNameAvailableAlready(StyleAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Style is already available");

                var StyleHeaderId = styleRepo.AddData(new Repository.StyleHeader
                {
                    StyleId = StyleAdd.StyleId,
                    Style = StyleAdd.StyleName,
                    ArticleNo = StyleAdd.ArticleNo,
                    Season = StyleAdd.Season,
                    DesignName = StyleAdd.DesignName,
                    Itemid=IId,//(int)StyleAdd.itemid,
                    IsActive = StyleAdd.IsActive.ToUpper() == "TRUE"
                });

                var detailList = new List<Repository.StyleDetail>();

                if (StyleAdd.StyleDet != null)
                {
                    foreach (var item in StyleAdd.StyleDet)
                    {
                        detailList.Add(new Repository.StyleDetail
                        {
                            StyleId = StyleHeaderId,
                            ItemId = item.ItemId,
                            Qty = item.Qty,
                        });
                    }
                }
                var result = styleRepo.AddDetData(detailList, "Add");

                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Response<bool> UpdateStyle(Domain.Style StyleUpd)
        {

            int? IId = 0;

            if (StyleUpd.itemid == 0)
            {
                IId = null;
            }
            else
            {
                IId = StyleUpd.itemid;
            }
            if (string.IsNullOrEmpty(StyleUpd.StyleName))
                return new Response<bool>(false, Status.ERROR, "Given Style is empty");
            if (isNameAvailableAlready(StyleUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Style is already available");

            var res = styleRepo.UpdateData(new Repository.StyleHeader
            {
                StyleId = StyleUpd.StyleId,
                Style = StyleUpd.StyleName,
                ArticleNo = StyleUpd.ArticleNo,
                Season = StyleUpd.Season,
                DesignName = StyleUpd.DesignName,
                Itemid = IId,//(int)StyleUpd.itemid,
                IsActive = StyleUpd.IsActive.ToUpper() == "TRUE"
            });

            var detailList = new List<Repository.StyleDetail>();
            if (StyleUpd.StyleDet != null)
            {
                if (StyleUpd.StyleDet.Count > 0)
                {
                    foreach (var item in StyleUpd.StyleDet)
                    {
                        detailList.Add(new Repository.StyleDetail
                        {
                            StyleId = StyleUpd.StyleId,
                            ItemId = item.ItemId,
                            Qty = item.Qty,
                        });
                    }
                    var result = styleRepo.AddDetData(detailList, "Update");
                }
            }
            else
            {
                //detailList.Add(new Repository.StyleDetail
                //{
                //    StyleId = StyleUpd.StyleId,

                //});

                var result = styleRepo.AddDetData(detailList, "Update",StyleUpd.StyleId);
            }
            //else if (StyleUpd.StyleDet.Count == 0)
            //{
            //    detailList.Clear();
            //}



            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");

            //var result = styleRepo.AddDetData(detailList);

            //return new Response<bool>(styleRepo.UpdateData(new Repository.StyleHeader
            //{
            //    StyleId = StyleUpd.StyleId,
            //    ArticleNo = StyleUpd.ArticleNo,
            //    Season = StyleUpd.Season,
            //    DesignName = StyleUpd.DesignName,
            //    StyleDetails = detailList,
            //    IsActive = StyleUpd.IsActive.ToUpper() == "TRUE"
            //}), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteStyle(int StyleId)
        {
            return new Response<bool>(styleRepo.DeleteData(StyleId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(Domain.Style sty, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetStyle().Value.Where(c => c.StyleName.ToUpper() == sty.StyleName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetStyle().Value.Where(c => c.StyleName.ToUpper() == sty.StyleName.ToUpper() && c.StyleId != sty.StyleId).ToList().Count > 0);
            }
            return false;
        }


        public Response<IList<Domain.Style>> GetStyleCheckItemDetails(int StyleId)
        {
            try
            {
                var ProductEWO = styleRepo.GetRepStyleCheckItemDetails(StyleId);

                return new Response<IList<Domain.Style>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Style>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
