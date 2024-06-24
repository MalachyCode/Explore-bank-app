// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const usersRouter = require('express').Router();
import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
// import multer from 'multer';
import multer, { FileFilterCallback } from 'multer';
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (
    _req: Request,
    _file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, './profilePictures/');
  },
  filename: function (
    _req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // accept a file
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    // reject a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

usersRouter.put(
  '/upload/:id',
  upload.single('profilePicture'),
  (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    // console.log('file', req.file);
    // console.log('body', req.body);
    // res.json(req.file);
    const user = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      middleName: body.middleName,
      password: body.password,
      type: body.type,
      isAdmin: body.isAdmin,
      number: body.number,
      dob: body.dob,
      transferPin: body.transferPin,
      profilePicture: req.file?.path,
    };

    console.log(user);

    User.findByIdAndUpdate(req.params.id, user, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((error) => next(error));
  }
);

usersRouter.get('/', (_req: Request, res: Response) => {
  User.find({}).then((users) => {
    res.json(users);
  });
});

usersRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

usersRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const emailUnique = await User.findOne({ email: body.email });

    if (emailUnique) {
      return res.status(401).json({
        error:
          'Provided email is linked to an existing account. Change your email or log into your account.',
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      middleName: body.middleName || '',
      password: passwordHash,
      type: body.type,
      isAdmin: body.isAdmin,
      number: body.number,
      dob: body.dob,
      transferPin: body.transferPin || '',
    });

    user
      .save()
      .then((savedUser) => {
        res.json(savedUser);
      })
      .catch((error) => next(error));
  }
);

usersRouter.post(
  '/find-main-admin',
  async (req: Request, res: Response, _next: NextFunction) => {
    const { email } = req.body;
    User.find().then((admin) => {
      const mainAdmin = admin.find(
        (mainAdmin) =>
          mainAdmin.firstName === 'Malachy' &&
          mainAdmin.lastName === 'Nwafor' &&
          mainAdmin.isAdmin &&
          mainAdmin.email === email
      );
      res.json(mainAdmin);
    });
  }
);

usersRouter.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => next(error));
  }
);

usersRouter.put(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const user = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      middleName: body.middleName,
      password: body.password,
      type: body.type,
      isAdmin: body.isAdmin,
      number: body.number,
      dob: body.dob,
      transferPin: body.transferPin,
      profilePicture: body.profilePicture,
    };

    User.findByIdAndUpdate(req.params.id, user, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((error) => next(error));
  }
);

usersRouter.put(
  '/transfer-pin/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const saltRounds = 10;
    const transferPinHash = await bcrypt.hash(body.transferPin, saltRounds);

    const user = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      middleName: body.middleName,
      password: body.password,
      type: body.type,
      isAdmin: body.isAdmin,
      number: body.number,
      dob: body.dob,
      transferPin: transferPinHash,
    };

    User.findByIdAndUpdate(req.params.id, user, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((error) => next(error));
  }
);

usersRouter.put(
  '/reset-password/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      middleName: body.middleName,
      password: passwordHash,
      type: body.type,
      isAdmin: body.isAdmin,
      number: body.number,
      dob: body.dob,
      transferPin: body.transferPin,
    };

    User.findByIdAndUpdate(req.params.id, user, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((error) => next(error));
  }
);

usersRouter.post('/check-pin', async (req: Request, res: Response) => {
  const { email, transferPin } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      error: 'Email not found',
    });
  }

  const pinCorrect = await bcrypt.compare(transferPin, user.transferPin);

  if (!pinCorrect) {
    return res.status(401).json({
      error: 'Wrong transfer pin',
    });
  }

  res.status(200).send(true);
});

// module.exports = usersRouter
export default usersRouter;
