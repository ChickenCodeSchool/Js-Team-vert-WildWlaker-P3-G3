import "./SideBar.css";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  Book,
  Images,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Logo from "../../assets/images/logo-wedoo.png";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};
interface SideBarProps {
  active: string;
  setActive: (value: string) => void;
}
type Host = {
  event_user_joining: number;
};
function SideBar({ active, setActive }: SideBarProps) {
  const { id } = useParams();
  const event = Number(id);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;
  const MotionLink = motion(Link);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isHost, setIsHost] = useState<Host>();

  useEffect(() => {
    fetch(`http://localhost:3310/api/event/host/${event}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur récupération host");
        }

        return res.json();
      })
      .then((data) => {
        setIsHost(data.event_host_id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [event]);

  const host = userId === isHost;

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/event/delete/${event}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Erreur suppression");
      }

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteUserJoining = async () => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/euj/delete/${userId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Erreur suppression");
      }
      setIsExitModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <motion.nav
        className="sidebar"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="logo-sidebar-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img src={Logo} alt="logo-wedoo" className="logo-sidebar-image" />
          <h2 className="logo-sidebar-h2">
            WE<i>D</i>OO
          </h2>
        </motion.div>

        <motion.ul
          className="sidebar-menu"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.li
            variants={itemVariants}
            className={active === "tableau" ? "active" : ""}
          >
            <motion.button
              type="button"
              onClick={() => setActive("tableau")}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LayoutDashboard size={20} className="layout" />
              <span>Tableau de bord</span>
            </motion.button>
          </motion.li>

          <motion.li
            variants={itemVariants}
            className={active === "messagerie" ? "active" : ""}
          >
            <motion.button
              type="button"
              onClick={() => setActive("messagerie")}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={20} className="message" />
              <span>Messagerie</span>
            </motion.button>
          </motion.li>

          <motion.li
            variants={itemVariants}
            className={active === "reservation" ? "active" : ""}
          >
            <motion.button
              type="button"
              onClick={() => setActive("reservation")}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Book size={20} className="book" />
              <span>Reservation</span>
            </motion.button>
          </motion.li>

          <motion.li
            variants={itemVariants}
            className={active === "budget" ? "active" : ""}
          >
            <motion.button
              type="button"
              onClick={() => setActive("budget")}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BadgeDollarSign size={20} className="dollar" />
              <span>Budget</span>
            </motion.button>
          </motion.li>

          <motion.li
            variants={itemVariants}
            className={active === "galerie" ? "active" : ""}
          >
            <motion.button
              type="button"
              onClick={() => setActive("galerie")}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Images size={20} className="image" />
              <span>Galerie</span>
            </motion.button>
          </motion.li>
        </motion.ul>

        <motion.ul
          className="sidebar-end-menu"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.li variants={itemVariants} className="sidebar-signal">
            <MotionLink
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              to={`/events/${event}/report`}
              className="link"
              style={{
                fontFamily: "Be Vietnam Pro, sans-serif",
                fontWeight: 400,
                fontSize: "13.333px",
                color: "black",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <TriangleAlert size={20} />
              <span>Signaler</span>
            </MotionLink>
          </motion.li>

          <motion.li variants={itemVariants} className="sidebar-delete-event">
            {host ? (
              <>
                <motion.button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 size={20} />
                  <span>Supprimer l'évenement</span>
                </motion.button>

                {isDeleteModalOpen && (
                  <div className="delete-modal-overlay">
                    <div className="delete-modal">
                      <h3>Supprimer l'évenement</h3>

                      <p>
                        Êtes-vous sûr de vouloir supprimer votre évenement ?
                      </p>

                      <div className="delete-modal-actions">
                        <button
                          type="button"
                          onClick={() => setIsDeleteModalOpen(false)}
                        >
                          Annuler
                        </button>

                        <button type="button" onClick={handleDeleteEvent}>
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <motion.button
                  type="button"
                  onClick={() => setIsExitModalOpen(true)}
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut size={20} />
                  <span>Quitter l'évenement</span>
                </motion.button>

                {isExitModalOpen && (
                  <div className="delete-modal-overlay">
                    <div className="delete-modal">
                      <h3>Quitter l'évenement</h3>

                      <p>Êtes-vous sûr de vouloir quitter l'évenement ?</p>

                      <div className="delete-modal-actions">
                        <button
                          type="button"
                          onClick={() => setIsExitModalOpen(false)}
                        >
                          Annuler
                        </button>

                        <button type="button" onClick={handleDeleteUserJoining}>
                          Quitter
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.li>
        </motion.ul>
      </motion.nav>
    </>
  );
}

export default SideBar;
