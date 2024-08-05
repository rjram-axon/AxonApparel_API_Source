using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IStyleTemplateBusiness
    {
        Response<IEnumerable<Domain.StyleTemplateMas>> GetStyleTemplate();
        Response<int> CreateStyleTemplate(Domain.StyleTemplateMas StyleTemp);
        Response<Domain.StyleTemplateMas> GetStyleTempId(int StyleTempId);
        Response<bool> UpdateStyleTemplate(Domain.StyleTemplateMas StyleUpd);
        Response<IQueryable<Domain.StyleTemplateDet>> GetStyleTemp(int id);
        Response<bool> DeleteData(int id);
    }
}
