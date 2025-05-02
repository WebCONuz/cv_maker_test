import { Action, Command, Ctx, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { UsersService } from "../users/users.service";

@Update()
export class BotUpdate {
  constructor(private readonly userService: UsersService) {}
  @Start()
  async startBot(@Ctx() ctx: Context) {
    await ctx.reply(`Assalomu alekum ${"@" + ctx?.from?.username || "user"}`);
  }

  @Command("inline")
  async inlineMsg(@Ctx() ctx: Context) {
    const inline_keyboard = [
      [
        {
          text: "Get Activation link",
          callback_data: "activate_btn",
        },
        {
          text: "Get My resume",
          callback_data: "resume_btn",
        },
      ],
    ];

    await ctx.reply("Bot imkoniyatlaridan foydalanishingiz mumkin:", {
      reply_markup: {
        inline_keyboard,
      },
    });
  }

  @Action("activate_btn")
  async getLink(@Ctx() ctx: Context) {
    console.log(ctx.from);

    // const user = await
    // await ctx.reply(
    //     `Your activation link: ${process.env.DOMEN}/api/auth/activate/${user.activate_link}`
    //   );
    await ctx.reply(
      "Activaye linkni olish uchun telefon nomerni kiriting: (+998(90)542-63-00)"
    );
  }

  @On("text")
  async userText(@Ctx() ctx: Context) {
    if ("text" in ctx.message!) {
      const phone_pattern = /^\+998\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
      if (phone_pattern.test(ctx.message.text)) {
        // find user db, send link
      } else await ctx.reply(":)");
    }
  }

  @On("message")
  async userMessage(@Ctx() ctx: Context) {
    await ctx.reply("Bu funksiya jarayonda <Pending ...>");
  }
}
