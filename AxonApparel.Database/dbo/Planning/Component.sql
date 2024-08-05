CREATE TABLE [dbo].[Component]
(
[componentid] [int] IDENTITY(1,1) NOT NULL primary key,
	[component] [varchar](75) NULL,
	[pannel] [char](1) NULL,
	[IsActive] [bit] NOT NULL DEFAULT (1),
	
	CONSTRAINT [CK_Componentpannel] CHECK  (([Pannel] = 'Y' or [Pannel] = 'N'))

	)
