using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class TermTemplateBusiness:ITermTemplateBusiness
    {
        ITermTemplateRepository GRep = new TermTemplateRepository();

        public Response<bool> CreateTermTemplate(Domain.Terms Term)
        {
            try
            {
                var AccListDetails = new List<TermDet>();
                if (Term.TermDet != null)
                {
                    foreach (var Acc in Term.TermDet)
                    {
                        AccListDetails.Add(new TermDet
                        {
                            TemplateName = Acc.TemplateName,
                            Termid = Acc.TermsId,
                            TermDesc = Acc.TermDesc,
                        });
                    }
                }
                var result = GRep.AddDetData(AccListDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
                            
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.Terms>> GetTermTemplate()
        {
            try
            {
                var ProductWO = GRep.GetDataMainList();

                return new Response<IQueryable<Domain.Terms>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Terms>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.Terms>> GetDataTermEditDetails(int Id)
        {
            try
            {
                var ProdutWO = GRep.GetDataTermRepEditDetails(Id);

                return new Response<IQueryable<Domain.Terms>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Terms>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.TermDet>> GetItemEditDetails(int Id)
        {
            try
            {
                var CRGList = GRep.GetRepEntryEditItemLoad(Id);

                return new Response<IList<Domain.TermDet>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.TermDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateTermTemplate(Domain.Terms UTerm)
        {
            try
            {
                var EAccListDetails = new List<TermDet>();
                if (UTerm.TermDet != null)
                {
                    foreach (var Acc in UTerm.TermDet)
                    {
                        EAccListDetails.Add(new TermDet
                        {
                            TemplateName = Acc.TemplateName,
                            Termid = Acc.TermsId,
                            TermDesc = Acc.TermDesc,
                            TemplateNameMasId=Acc.TemplateNameId,
                        });
                    }
                }
                var result = GRep.UpdateDetData(EAccListDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteTermTemplate(Domain.Terms DTerm)
        {
            try
            {
                var DAccListDetails = new List<TermDet>();
                if (DTerm.TermDet != null)
                {
                    foreach (var Acc in DTerm.TermDet)
                    {
                        DAccListDetails.Add(new TermDet
                        {
                            TemplateName = Acc.TemplateName,
                            Termid = Acc.TermsId,
                            TermDesc = Acc.TermDesc,
                            TemplateNameMasId = Acc.TemplateNameId,
                        });
                    }
                }
                var result = GRep.DeleteDetData(DAccListDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
