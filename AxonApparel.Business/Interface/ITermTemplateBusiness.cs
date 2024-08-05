using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ITermTemplateBusiness
    {
        Response<bool> CreateTermTemplate(Terms Term);
        Response<IQueryable<Domain.Terms>> GetTermTemplate();
        Response<IQueryable<Terms>> GetDataTermEditDetails(int Id);
        Response<IList<TermDet>> GetItemEditDetails(int Id);
        Response<bool> UpdateTermTemplate(Terms UTerm);
        Response<bool> DeleteTermTemplate(Terms DTerm);
    }
}
